package task_service

import (
	"log/slog"
	"taskflow/task-service/internal/domain/models"
	task_dto "taskflow/task-service/internal/dto/task"
	task_repository "taskflow/task-service/internal/storage/repositories/task"
	"taskflow/task-service/internal/types"
)

type TaskService struct {
	taskRepo *task_repository.TaskRepository
	logger   *slog.Logger
}

func Init(taskRepo *task_repository.TaskRepository, logger *slog.Logger) *TaskService {
	return &TaskService{
		taskRepo: taskRepo,
		logger:   logger,
	}
}

func (s *TaskService) CreateTask(taskDto *task_dto.CreateTaskRequest) (*task_dto.CreateTaskResponse, error) {
	response, err := s.taskRepo.CreateTask(taskDto)

	if err != nil {
		return nil, err
	}

	return response, nil
}

func (s *TaskService) FindTasks() ([]models.Task, error) {
	response, err := s.taskRepo.FindTasks()

	if err != nil {
		return nil, err
	}

	return response, nil
}

func (s *TaskService) UpdateTask(taskDto *task_dto.UpdateTaskRequest) (*task_dto.UpdateTaskResponse, error) {
	response, err := s.taskRepo.UpdateTask(taskDto)

	if err != nil {
		return nil, err
	}

	return response, nil
}

func (s *TaskService) DeleteTask(taskId types.IdType) (*models.Task, error) {
	response, err := s.taskRepo.DeleteTask(taskId)

	if err != nil {
		return nil, err
	}

	return response, nil
}
