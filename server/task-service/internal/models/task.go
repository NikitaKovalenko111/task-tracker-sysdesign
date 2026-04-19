package models

import (
	"taskflow/task-service/internal/types"
	"time"
)

type Task struct {
	Id          types.IdType `json:"task_id"`
	Name        string       `json:"task_name"`
	Description string       `json:"task_desc"`
	Deadline    time.Time    `json:"task_deadline"`
	Status      string       `json:"task_status"`
	ProjectId   types.IdType `json:"task_project_id"`
}
