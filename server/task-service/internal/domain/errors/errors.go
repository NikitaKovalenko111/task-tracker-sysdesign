package domain_errors

import "errors"

var (
	ErrNoRows = errors.New("the task wasn't found")
)
