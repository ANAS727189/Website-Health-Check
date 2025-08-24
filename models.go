package main

import (
	"time"
)

type HealthResult struct {
	URL           string            `json:"url"`
	StatusCode    int               `json:"statusCode,omitempty"`
	Duration      time.Duration     `json:"duration,omitempty"`
	DurationMs    float64           `json:"durationMs,omitempty"`
	Alive         bool              `json:"alive"`
	Error         string            `json:"error,omitempty"`
	ResponseSize  int64             `json:"responseSize,omitempty"`
	Headers       map[string]string `json:"headers,omitempty"`
	SSLInfo       *SSLInfo          `json:"sslInfo,omitempty"`
	RedirectChain []string          `json:"redirectChain,omitempty"`
	IPAddress     string            `json:"ipAddress,omitempty"`
	ContentType   string            `json:"contentType,omitempty"`
	Server        string            `json:"server,omitempty"`
	Timestamp     time.Time         `json:"timestamp"`
}

type SSLInfo struct {
	Valid      bool      `json:"valid"`
	Issuer     string    `json:"issuer,omitempty"`
	Subject    string    `json:"subject,omitempty"`
	ExpiryDate time.Time `json:"expiryDate,omitempty"`
	DaysLeft   int       `json:"daysLeft,omitempty"`
}

type BatchRequest struct {
	URLs []string `json:"urls"`
}

type BatchResponse struct {
	Results []HealthResult `json:"results"`
	Summary BatchSummary   `json:"summary"`
}

type BatchSummary struct {
	Total   int `json:"total"`
	Healthy int `json:"healthy"`
	Down    int `json:"down"`
}

type SingleCheckRequest struct {
	URL string `json:"url"`
}
