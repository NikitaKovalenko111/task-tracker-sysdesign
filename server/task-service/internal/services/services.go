package services

import (
	task_service "taskflow/task-service/internal/services/usecase/task"
	"taskflow/task-service/internal/storage/repositories"
)

type Services struct {
	TaskService *task_service.TaskService
}

func Init(repos *repositories.Repos) *Services {
	return &Services{
		TaskService: task_service.Init(repos.TaskRepository),
	}
}
