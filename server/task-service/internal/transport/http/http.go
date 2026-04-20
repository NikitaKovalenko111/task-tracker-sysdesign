package http

import (
	"log/slog"
	"taskflow/task-service/internal/config"
	"taskflow/task-service/internal/services"
	"taskflow/task-service/internal/transport/http/controllers"

	"github.com/gofiber/fiber/v2"
)

type HTTPServer struct {
	app         *fiber.App
	controllers *controllers.Controllers
	config      *config.Config
	logger      *slog.Logger
}

func Init(app *fiber.App, services *services.Services, logger *slog.Logger, config *config.Config) *HTTPServer {
	return &HTTPServer{
		app:         app,
		controllers: controllers.Init(services),
		logger:      logger,
		config:      config,
	}
}

func (http *HTTPServer) Start() {
	http.controllers.Start(http.app)

	go http.app.Listen(http.config.Address)

	http.logger.Info("Http server has started!")
}

func (http *HTTPServer) Stop() {
	http.logger.Info("Stopping the server...")

	err := http.app.Shutdown()

	if err != nil {
		panic("Couldn't stop the server")
	}
}
