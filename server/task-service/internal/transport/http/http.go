package http

import (
	"taskflow/task-service/internal/services"
	"taskflow/task-service/internal/transport/http/controllers"

	"github.com/gofiber/fiber/v2"
)

type HTTPServer struct {
	app         *fiber.App
	controllers *controllers.Controllers
}

func Init(app *fiber.App, services *services.Services) *HTTPServer {
	return &HTTPServer{
		app:         app,
		controllers: controllers.Init(services),
	}
}

func (http *HTTPServer) Start() {
	http.controllers.Start()
}
