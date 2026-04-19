package task_repository

import (
	"database/sql"
	task_dto "taskflow/task-service/internal/dto/task"
	"taskflow/task-service/internal/models"
	"taskflow/task-service/pkg/types"
)

type TaskRepository struct {
	db *sql.DB
}

func Init(db *sql.DB) *TaskRepository {
	return &TaskRepository{
		db: db,
	}
}

func (r *TaskRepository) CreateTask(taskDto *task_dto.CreateTaskRequest) (*task_dto.CreateTaskResponse, error) {
	var query string

	query = `
		INSERT INTO tasks (task_name, task_desc, task_deadline, task_status, task_project_id) VALUES
		($1, $2, $3, $4, $5)
		RETURNING (task_id, task_name, task_desc, task_deadline, task_status, task_project_id)
	`

	var task task_dto.CreateTaskResponse

	err := r.db.QueryRow(
		query, taskDto.Name, taskDto.Description, taskDto.Deadline, taskDto.Status, taskDto.ProjectId,
	).Scan(&task.Id, &task.Name, &task.Description, &task.Deadline, &task.Status, &task.ProjectId)

	if err != nil {
		return nil, err
	}

	return &task, nil
}

func (r *TaskRepository) FindTasks() ([]models.Task, error) {
	var query string

	query = `
		SELECT (task_id, task_name, task_desc, task_deadline, task_status, task_project_id)
		FROM tasks
	`

	row, err := r.db.Query(query)

	if err != nil {
		return nil, err
	}

	var tasks []models.Task

	for row.Next() {
		var task models.Task

		err = row.Scan(&task.Id, &task.Name, &task.Description, &task.Deadline, &task.Status, &task.ProjectId)

		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}

func (r *TaskRepository) UpdateTask(newTask *task_dto.UpdateTaskRequest) (*task_dto.UpdateTaskResponse, error) {
	var query string

	query = `
		UPDATE tasks
		SET task_name = $1,
		task_desc = $2,
		task_deadline = $3,
		task_status = $4,
		task_project_id = $5,
		WHERE task_id = $6
		RETURNING (task_id, task_name, task_desc, task_deadline, task_status, task_project_id)
	`

	var response task_dto.UpdateTaskResponse

	err := r.db.QueryRow(
		query, newTask.Name, newTask.Description, newTask.Deadline, newTask.Status, newTask.ProjectId, newTask.Id,
	).Scan(&response.Id, &response.Name, &response.Description, &response.Deadline, &response.Status, &response.ProjectId)

	if err != nil {
		return nil, err
	}

	return &response, nil
}

func (r *TaskRepository) DeleteTask(taskId types.IdType)
