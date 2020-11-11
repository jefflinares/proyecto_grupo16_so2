package main

import (
	"bytes"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"

	socketio "github.com/googollee/go-socket.io"
)

func main() {
	server, err := createServerSocket()

	if err != nil {
		log.Fatal(err)
	}

	go server.Serve()
	defer server.Close()

	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.Handle("/socket.io/", server)
	log.Println("Server on port 3005")
	log.Fatal(http.ListenAndServe(":3005", nil))
}

func createServerSocket() (*socketio.Server, error) {
	server, err := socketio.NewServer(nil)
	if err != nil {
		return nil, err
	}

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		log.Println("A new user connected")
		return nil
	})

	server.OnEvent("/", "ram-total", func(s socketio.Conn, msg string) {
		total, err := getTotalRAM()
		if err != nil {
			log.Fatal(err)
		}
		s.Emit("ram-total", total)
	})

	consumed := new(MemoryConsumed)

	server.OnEvent("/", "ram-used", func(s socketio.Conn, msg string) {
		consumed.calculate()
		s.Emit("ram-used", consumed)
	})

	server.OnEvent("/", "proc", func(s socketio.Conn, msg string) {

		fmt.Println("Si recibio el request")
		ProcInfo := getInfoProcs()
		// json_bytes, _ := json.Marshal(ProcInfo)
		//s.Emit("proc", 2)
		s.Emit("proc", ProcInfo)
		//fmt.Println(ProcInfo)
	})

	server.OnEvent("/", "kill", func(s socketio.Conn, pid string) {

		cmd := exec.Command("kill", "-9", pid)
		cmdOutput := &bytes.Buffer{}
		cmd.Stdout = cmdOutput
		err := cmd.Run()
		if err != nil {
			s.Emit("kill", err.Error())
			os.Stderr.WriteString(err.Error())
		}
		s.Emit("kill", 1)
	})

	server.OnDisconnect("/", func(s socketio.Conn, msg string) {})

	return server, nil
}
