package main

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"strings"
)

type Proc struct {
	Pid    string  `json:"Pid,omitempty"`
	Name   string  `json:"Name,omitempty"`
	User   string  `json:"User,omitempty"`
	Status string  `json:"Status,omitempty"`
	Memory string  `json:"Memory,omitempty"`
	PPid   string  `json:"PPid,omitempty"`
	Hijos  []*Proc `json:"Hijos,omitempty"`
}

type ProcsInfo struct {
	No_Procs     int     `json:"No_Procs"`
	No_Procs_Run int     `json:"No_Procs_Run"`
	No_Procs_Slp int     `json:"No_Procs_Slp"`
	No_Procs_Stp int     `json:"No_Procs_Stp"`
	No_Procs_Zmb int     `json:"No_Procs_Zmb"`
	Processes    []*Proc `json:"Processes,omitempty"`
}

func getInfoProcs() *ProcsInfo {
	//leer con csv

	csvFile, err := os.Open("/proc/cpu_grupo16")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened CSV file")
	defer csvFile.Close()

	csvLines, err := csv.NewReader(csvFile).ReadAll()
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println(csvLines)

	procs := []*Proc{}
	No_Procs_Sleeping := 0
	No_Procs_Stopped := 0
	No_Procs_Zombies := 0
	No_Procs_Running := 0

	i := 0
	for _, line := range csvLines {
		i = i + 1
		if i == 1 {
			continue
		}

		p := new(Proc)

		p.PPid = strings.TrimSpace(line[0])
		p.Pid = strings.TrimSpace(line[1])
		p.Name = strings.TrimSpace(line[2])
		p.User = strings.TrimSpace(line[3])
		if len(p.User) > 0 {
			user_id, err := strconv.ParseUint(p.User, 10, 64)
			if err != nil {
				log.Fatal(err)
			} else {
				user_id := strings.TrimSpace(fmt.Sprintf("%8d", user_id))
				cmd := exec.Command("id", "-nu", user_id)
				cmdOutput := &bytes.Buffer{}
				cmd.Stdout = cmdOutput
				err := cmd.Run()
				if err != nil {
					os.Stderr.WriteString(err.Error())
				}
				p.User = strings.Replace(string(cmdOutput.Bytes()), "\n", "", -1)

			}
		}

		//STATUS
		p.Status = strings.TrimSpace(line[4])
		switch p.Status {

		case "Sleeping":
			No_Procs_Sleeping++
			break
		case "Stopped":
			No_Procs_Stopped++
			break
		case "Zombie":
			No_Procs_Zombies++
			break
		case "Running":
			No_Procs_Running++
			break
		}

		//MEMORY

		//fmt.Println("Calcular memoria")
		value := strings.TrimSpace(line[5])
		//fmt.Println("Memoria_V :", value)
		t, err := strconv.ParseUint(value, 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		mem, err := getTotalRAM()
		if err != nil {
			log.Fatal(err)
		}
		value_mem := strings.TrimSpace(strings.Replace(mem, "MB", "", -1))
		t = t / 1024

		s, err := strconv.ParseFloat(value_mem, 32)
		if err == nil {
			fmt.Println(s)
		}
		percent_used := float32(t) / float32(s) * 100.00
		p.Memory = fmt.Sprintf("%.2f", percent_used)
		//fmt.Println("Proceso:", p.Name, " %memory:", p.Memory, "percenten:", percent_used, "totalRam:", mem, "memProc:", t)
		//5431.72
		procs = append(procs, p)

	}

	//agregar los hijos a cada proceso

	procs_padre := []*Proc{}

	for _, p := range procs {
		//fmt.Println("agregar hijo a:", p.PPid, " IdHijo:", p.Pid)
		//if strings.Compare(p.PPid, "0") == 0 || strings.Compare(p.PPid, "-1") == 0 {
		if strings.Compare(p.PPid, "-1") == 0 {
			procs_padre = append(procs_padre, p)
		} else {
			addHijo(procs, p)
		}
	}

	fmt.Println("Procesos recogidos total:", len(procs))
	fmt.Println("Procesos padres total:", len(procs_padre))
	/*
		for _, p := range procs_padre {
			seeTreeProcess(p, "---")
		}
	*/

	return &ProcsInfo{No_Procs: len(procs), No_Procs_Run: No_Procs_Running,
		No_Procs_Slp: No_Procs_Sleeping, No_Procs_Stp: No_Procs_Stopped,
		No_Procs_Zmb: No_Procs_Zombies, Processes: procs_padre}

}

func seeTreeProcess(proc *Proc, tab string) {
	//fmt.Println(tab, "Proccess: ", proc.Name)
	if len(proc.Hijos) > 0 {
		for _, H := range proc.Hijos {
			seeTreeProcess(H, tab+"---")
		}
	}

}

func addHijo(procs []*Proc, child_proc *Proc) {
	for i := 0; i < len(procs); i++ {
		p := procs[i]
		if strings.Compare(p.Pid, child_proc.PPid) == 0 {

			//fmt.Println("Se agrego al proceso padre:", p.Name, "|id:", p.Pid, "  El hijo ", child_proc.Name, "|id:", child_proc.Pid, "|ppid:", child_proc.PPid)
			p.Hijos = append(p.Hijos, child_proc)
			//fmt.Println("Numero hijos: ", len(p.Hijos))
		}
	}
}
