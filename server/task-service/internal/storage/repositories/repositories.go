package repositories

import (
	"database/sql"
	task_repository "taskflow/task-service/internal/storage/repositories/task"
)

type Repos struct {
	TaskRepository *task_repository.TaskRepository
}

func Init(db *sql.DB) *Repos {
	return &Repos{
		TaskRepository: task_repository.Init(db),
	}
}
