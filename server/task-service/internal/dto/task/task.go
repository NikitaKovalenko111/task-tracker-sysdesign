package task_dto

import (
	"taskflow/task-service/internal/types"
	"time"
)

type CreateTaskRequest struct {
	Name        string       `json:"task_name" validate:"required,min=3,max=100"`
	Description string       `json:"task_desc" validate:"min=5"`
	Deadline    time.Time    `json:"task_deadline"`
	ProjectId   types.IdType `json:"task_project_id" validate:"required"`
	Status      string       `json:"task_status" validate:"required"`
}

type CreateTaskResponse struct {
	Id          types.IdType `json:"task_id"`
	Name        string       `json:"task_name"`
	Description string       `json:"task_desc"`
	Deadline    time.Time    `json:"task_deadline"`
	Status      string       `json:"task_status"`
	ProjectId   types.IdType `json:"task_project_id"`
}

type UpdateTaskRequest struct {
	Id          types.IdType `json:"task_id" validate:"required"`
	Name        string       `json:"task_name" validate:"required,min=3,max=100"`
	Description string       `json:"task_desc" validate:"min=5"`
	Deadline    time.Time    `json:"task_deadline"`
	Status      string       `json:"task_status" validate:"required"`
	ProjectId   types.IdType `json:"task_project_id" validate:"required"`
}

type UpdateTaskResponse struct {
	Id          types.IdType `json:"task_id"`
	Name        string       `json:"task_name"`
	Description string       `json:"task_desc"`
	Deadline    time.Time    `json:"task_deadline"`
	Status      string       `json:"task_status"`
	ProjectId   types.IdType `json:"task_project_id"`
}
