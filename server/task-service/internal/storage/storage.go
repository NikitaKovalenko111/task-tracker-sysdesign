package storage

import (
	"database/sql"
	"fmt"
	"taskflow/task-service/internal/config"
	"taskflow/task-service/internal/storage/repositories"

	_ "github.com/lib/pq"
)

type Storage struct {
	Repositories *repositories.Repos
	Db           *sql.DB
}

func Connect(cfg *config.Config) *sql.DB {
	var connString = fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		cfg.Db_host, cfg.Db_port, cfg.Db_user, cfg.Db_pass, cfg.Db_name,
	)

	db, err := sql.Open("postgres", connString)

	if err != nil {
		panic(fmt.Sprintf("Couldn't connect to database! Error: %s", err.Error()))
	}

	return db
}

func Init(conn *sql.DB, repos *repositories.Repos) *Storage {
	return &Storage{
		Db:           conn,
		Repositories: repos,
	}
}
