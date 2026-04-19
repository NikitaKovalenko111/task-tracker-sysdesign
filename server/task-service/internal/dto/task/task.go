package task_dto

import (
	"taskflow/task-service/internal/models"
	"taskflow/task-service/pkg/types"
	"time"
)

type CreateTaskRequest struct {
	Name        string       `json:"task_name"`
	Description string       `json:"task_desc"`
	Deadline    time.Time    `json:"task_deadline"`
	ProjectId   types.IdType `json:"task_project_id"`
	Status      string       `json:"task_status"`
}

type CreateTaskResponse struct {
	models.Task
}

type UpdateTaskRequest struct {
	models.Task
}

type UpdateTaskResponse struct {
	models.Task
}
