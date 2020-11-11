package main

import (
	"strings"
)

const filename string = "/proc/mem_grupo16"

type MemoryConsumed struct {
	Total   string  `json:"total"`
	Percent string `json:"percent"`
}

func (consumed *MemoryConsumed) calculate() error {
	lines, err := readLines(filename)

	if (err != nil) {
		return err
	}

	for _, line := range lines {
		fields := strings.Split(line, ":")
		if len(fields) != 2 {
			continue
		}

		key := strings.TrimSpace(fields[0])
		value := strings.TrimSpace(fields[1])

		switch key {
		case "Memoria consumida":
			consumed.Total = value
		case "Porcentaje usado":
			consumed.Percent = value
		}
	}

	return nil
}

func getTotalRAM()(string, error) {
	lines, err := readLines(filename)

	if (err != nil) {
		return "", err;
	}

	line := lines[0]
	fields := strings.Split(line, ":")
	if len(fields) != 2 {
		return "", nil
	}

	value := strings.TrimSpace(fields[1])

	return value, nil 
}
