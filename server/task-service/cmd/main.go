package main

import (
	"os"
	"os/signal"
	"syscall"
	"taskflow/task-service/internal/app"

	_ "taskflow/task-service/docs"
)

// @title Task service for taskflow app
// @version 1.0
// @description This is task service for taskflow app
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host petstore.swagger.io
// @BasePath /
func main() {
	app := app.New()

	app.Start()

	exit := make(chan os.Signal, 1)
	signal.Notify(exit, os.Interrupt, syscall.SIGTERM)

	<-exit

	app.Stop()
}
