package task_controller

import (
	"strconv"
	task_dto "taskflow/task-service/internal/dto/task"
	task_service "taskflow/task-service/internal/services/usecase/task"
	"taskflow/task-service/internal/types"

	"github.com/gofiber/fiber/v2"
)

type TaskController struct {
	TaskService *task_service.TaskService
	Router      *fiber.App
}

func Init(taskService *task_service.TaskService) *TaskController {
	return &TaskController{
		TaskService: taskService,
	}
}

func (c *TaskController) Start(route string) {
	router := c.Router.Group("/tasks")

	router.Get("/", c.GetTasks)
	router.Post("/", c.CreateTask)
	router.Put("/")
	router.Delete("/:id")
}

func (ctr *TaskController) CreateTask(c *fiber.Ctx) error {
	var body task_dto.CreateTaskRequest

	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, "Couldn't parse body")
	}

	response, err := ctr.TaskService.CreateTask(&body)

	if err != nil {
		return fiber.NewError(fiber.ErrInternalServerError.Code, "Some error during creating task...")
	}

	return c.Status(fiber.StatusOK).JSON(response)
}

func (ctr *TaskController) GetTasks(c *fiber.Ctx) error {
	response, err := ctr.TaskService.FindTasks()

	if err != nil {
		return fiber.NewError(fiber.ErrInternalServerError.Code, "Some error during getting task...")
	}

	return c.Status(fiber.StatusOK).JSON(response)
}

func (ctr *TaskController) UpdateTask(c *fiber.Ctx) error {
	var body task_dto.UpdateTaskRequest

	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.ErrBadRequest.Code, "Couldn't parse body")
	}

	response, err := ctr.TaskService.UpdateTask(&body)

	if err != nil {
		return fiber.NewError(fiber.ErrInternalServerError.Code, "Some error during updating task...")
	}

	return c.Status(fiber.StatusOK).JSON(response)
}

func (ctr *TaskController) DeleteTask(c *fiber.Ctx) error {
	idParam := c.Params("id")

	taskId, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		return fiber.NewError(fiber.ErrInternalServerError.Code, "Couldn't parse id...")
	}

	response, err := ctr.TaskService.DeleteTask(types.IdType(taskId))

	if err != nil {
		return fiber.NewError(fiber.ErrInternalServerError.Code, "Some error during deleting task...")
	}

	return c.Status(fiber.StatusOK).JSON(response)
}
