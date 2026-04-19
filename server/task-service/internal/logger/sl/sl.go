package sl

import (
	"log/slog"
	"os"
	"taskflow/task-service/internal/config"
	"taskflow/task-service/internal/types"

	"github.com/lmittmann/tint"
)

func Init(config *config.Config) *slog.Logger {
	var slogLevel slog.Level

	switch config.Env {
	case types.EnvLocal:
		slogLevel = slog.LevelDebug
	case types.EnvProd:
		slogLevel = slog.LevelInfo
	}

	logger := slog.New(tint.NewHandler(os.Stdout, &tint.Options{
		Level:     slogLevel,
		AddSource: true,
	}))

	return logger
}
