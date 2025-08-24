package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Setup routes
	http.HandleFunc("/check", checkHandler)
	http.HandleFunc("/batch", batchCheckHandler)

	// Server info
	fmt.Println(ServerStartMessage)
	for _, info := range EndpointsInfo {
		fmt.Println(info)
	}

	// Start server
	if err := http.ListenAndServe(ServerPort, nil); err != nil {
		fmt.Printf("Server failed to start: %v\n", err)
	}
}
