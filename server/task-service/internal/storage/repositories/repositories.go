package repositories

import (
	"database/sql"
	"log/slog"
	task_repository "taskflow/task-service/internal/storage/repositories/task"
)

type Repos struct {
	TaskRepository *task_repository.TaskRepository
}

func Init(db *sql.DB, logger *slog.Logger) *Repos {
	return &Repos{
		TaskRepository: task_repository.Init(db, logger),
	}
}
