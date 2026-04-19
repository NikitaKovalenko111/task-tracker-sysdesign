package controllers

import (
	"taskflow/task-service/internal/services"
	task_controller "taskflow/task-service/internal/transport/http/controllers/task"

	"github.com/gofiber/fiber/v2"
)

type Controllers struct {
	TaskController *task_controller.TaskController
}

func Init(services *services.Services) *Controllers {
	return &Controllers{
		TaskController: task_controller.Init(services.TaskService),
	}
}

func (c *Controllers) Start(app *fiber.App) {
	taskRouter := app.Group("tasks")
	c.TaskController.RegisterRoutes(taskRouter)
}
