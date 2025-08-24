package main

import (
	"encoding/json"
	"net/http"
)

func checkHandler(w http.ResponseWriter, r *http.Request) {
	setupCORSHeaders(w)

	if handlePreflight(w, r) {
		return
	}

	if !validateMethod(w, r, http.MethodPost) {
		return
	}

	var req SingleCheckRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.URL == "" {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	// Validate URL
	req.URL = validateAndNormalizeURL(req.URL)

	result := checkWebsite(req.URL)

	setJSONContentType(w)
	json.NewEncoder(w).Encode(result)
}

func batchCheckHandler(w http.ResponseWriter, r *http.Request) {
	setupCORSHeaders(w)

	if handlePreflight(w, r) {
		return
	}

	if !validateMethod(w, r, http.MethodPost) {
		return
	}

	var req BatchRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || len(req.URLs) == 0 {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	// Limit batch size
	if len(req.URLs) > MaxBatchSize {
		http.Error(w, "too many URLs, limit is 50", http.StatusBadRequest)
		return
	}

	results := make([]HealthResult, len(req.URLs))
	resultChan := make(chan struct {
		index  int
		result HealthResult
	}, len(req.URLs))

	// Check URLs concurrently
	for i, url := range req.URLs {
		go func(index int, u string) {
			u = validateAndNormalizeURL(u)
			result := checkWebsite(u)
			resultChan <- struct {
				index  int
				result HealthResult
			}{index, result}
		}(i, url)
	}

	// Collect results
	healthy := 0
	for i := 0; i < len(req.URLs); i++ {
		res := <-resultChan
		results[res.index] = res.result
		if res.result.Alive {
			healthy++
		}
	}

	response := BatchResponse{
		Results: results,
		Summary: BatchSummary{
			Total:   len(req.URLs),
			Healthy: healthy,
			Down:    len(req.URLs) - healthy,
		},
	}

	setJSONContentType(w)
	json.NewEncoder(w).Encode(response)
}
