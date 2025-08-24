package main

import "time"

const (
	// Server configuration
	ServerPort = ":8080"

	// HTTP client configuration
	RequestTimeout = 10 * time.Second
	MaxRedirects   = 10

	// Batch processing limits
	MaxBatchSize = 50

	// Default protocol for URLs without scheme
	DefaultProtocol = "https://"
)

// Server messages
var (
	ServerStartMessage = "🚀 Enhanced Health Checker API running at http://localhost:8080"
	EndpointsInfo      = []string{
		"📋 Endpoints:",
		"   POST /check - Check single website",
		"   POST /batch - Check multiple websites",
	}
)
