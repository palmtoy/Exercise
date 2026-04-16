package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Create a Gin router with default middleware (logger and recovery)
	r := gin.Default()
	r.SetTrustedProxies([]string{
		"172.16.0.0/16", // 模拟信任局域网（类似 AWS ALB 所在 VPC）
		"127.0.0.1",     // IPv4 loopback
		"::1",           // IPv6 loopback (localhost)
	})

	/*
	   curl -H "X-Forwarded-For: 203.0.113.5" http://172.16.64.230:8080/ping
	   curl -H "X-Forwarded-For: 203.0.113.5" http://127.0.0.1:8080/ping
	   curl -H "X-Forwarded-For: 203.0.113.5" http://localhost:8080/ping
	*/
	// Define a simple GET endpoint
	r.GET("/ping", func(c *gin.Context) {
		// Return JSON response
		c.JSON(http.StatusOK, gin.H{
			"message":   "pong",
			"client_ip": c.ClientIP(), // 应该返回 203.0.113.5
		})
	})

	r.GET("/ip", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"client_ip":       c.ClientIP(),
			"x-forwarded-for": c.GetHeader("X-Forwarded-For"),
		})
	})

	// Server will listen on 0.0.0.0:8081 (localhost:8081 on Windows)
	port := "8081"
	fmt.Println("Gin HTTP server is running on :" + port)
	r.Run(":" + port)
}
