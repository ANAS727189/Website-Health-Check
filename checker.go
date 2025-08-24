package main

import (
	"fmt"
	"net/http"
	"strings"
	"time"
)

func checkWebsite(url string) HealthResult {
	start := time.Now()
	timestamp := time.Now()

	// Create custom client with timeout and redirect policy
	client := &http.Client{
		Timeout: RequestTimeout,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			// Allow up to configured max redirects
			if len(via) >= MaxRedirects {
				return fmt.Errorf("too many redirects")
			}
			return nil
		},
	}

	resp, err := client.Get(url)
	duration := time.Since(start)
	durationMs := float64(duration.Nanoseconds()) / 1e6

	if err != nil {
		return HealthResult{
			URL:        url,
			Alive:      false,
			Error:      err.Error(),
			Duration:   duration,
			DurationMs: durationMs,
			Timestamp:  timestamp,
		}
	}
	defer resp.Body.Close()

	// Extract headers
	headers := make(map[string]string)
	for key, values := range resp.Header {
		if len(values) > 0 {
			headers[key] = values[0]
		}
	}

	// Get SSL info if HTTPS
	var sslInfo *SSLInfo
	if strings.HasPrefix(url, "https://") && resp.TLS != nil && len(resp.TLS.PeerCertificates) > 0 {
		cert := resp.TLS.PeerCertificates[0]
		daysLeft := int(time.Until(cert.NotAfter).Hours() / 24)

		sslInfo = &SSLInfo{
			Valid:      time.Now().Before(cert.NotAfter),
			Issuer:     cert.Issuer.CommonName,
			Subject:    cert.Subject.CommonName,
			ExpiryDate: cert.NotAfter,
			DaysLeft:   daysLeft,
		}
	}

	// Get content length
	contentLength := resp.ContentLength
	if contentLength == -1 {
		contentLength = 0
	}

	return HealthResult{
		URL:          url,
		StatusCode:   resp.StatusCode,
		Duration:     duration,
		DurationMs:   durationMs,
		Alive:        resp.StatusCode >= 200 && resp.StatusCode < 400,
		ResponseSize: contentLength,
		Headers:      headers,
		SSLInfo:      sslInfo,
		ContentType:  headers["Content-Type"],
		Server:       headers["Server"],
		Timestamp:    timestamp,
	}
}

func validateAndNormalizeURL(url string) string {
	if !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
		return DefaultProtocol + url
	}
	return url
}
