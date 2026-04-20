package app

import (
	"taskflow/task-service/internal/config"
	"taskflow/task-service/internal/logger/sl"
	"taskflow/task-service/internal/services"
	"taskflow/task-service/internal/storage"
	"taskflow/task-service/internal/storage/repositories"
	"taskflow/task-service/internal/transport/http"

	"github.com/gofiber/fiber/v2"
	fiberSwagger "github.com/swaggo/fiber-swagger"
)

type App struct {
	http *http.HTTPServer
}

func New() *App {
	config := config.MustLoad()

	logger := sl.Init(config)

	logger.Info("Logger is started!")

	db := storage.Connect(config)

	logger.Info("Connected to database!")

	defer db.Close()

	repos := repositories.Init(db, logger)

	logger.Info("Inited repositories!")

	services := services.Init(repos, logger)

	logger.Info("Inited services!")

	app := fiber.New(fiber.Config{
		StrictRouting: false,
		ReadTimeout:   config.Timeout,
		IdleTimeout:   config.Idle_timeout,
	})

	app.Get("/swagger/*", fiberSwagger.WrapHandler)

	http := http.Init(app, services, logger, config)

	logger.Info("Inited HTTP server!")

	return &App{
		http: http,
	}
}

func (app *App) Start() {
	go app.http.Start()
}

func (app *App) Stop() {
	app.http.Stop()
}
