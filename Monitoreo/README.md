<h1><center><strong>[SO2]Practica1_16</strong></center></h1>

## Desarrolladores

| Nombre                              | Carnet    |
| ----------------------------------- | --------- |
| Oscar René Cuéllar Mancilla         | 201503712 |
| Ronald Neftali Berdúo Morales       | 201504420 |
| Jefferson José Carlos LInares Cerón | 201504448 |

## Usuarios y grupos Máquina

Comandos Creación de Usuarios

- sudo useradd -m usr2 -p sopes2020
- sudo useradd -m usr3 -p sopes2020
- sudo useradd -m usr4 -p sopes2020

Comandos Creación de Grupos

- sudo groupadd group1
- sudo groupadd group2

Comandos Asignación de Usuarios a Grupos

- sudo usermod -a -G group1 usr2
- sudo usermod -a -G group2 usr3
- sudo usermod -a -G group2 usr4

Consultar Usuarios en un Grupo

- sudo apt-get install members
- members group2

## Módulos

Archivos escritos en el lenguaje C para crear módulos para obtener los datos de los memoria RAM y del CPU.

### Módulo CPU

Método recursivo para leer cada proceso del sistema operativo. Obtiene el archivo para escribir, el proceso padre y los tabs a imprimir.

```c++

/*
 * Metodo recursivo para leer cada proceso
 *
 * @param file archivo donde se va escribir
 * @param task_parent proceso padre
 * @param pid_parent PID del proceso padre
 */
void read_process(struct seq_file *file, struct task_struct *task_parent, pid_t pid_parent)
```

Método que imprime los procesos y busca el proceso padre, guardada en la variable init_task.

```c++

/*
 * Metodo que imprime los procesos
 */
static int task_tree(struct seq_file *file, void *v)
```

Método que reacciona al abrir el archivo del proceso.

```c++
static int cpu_proc_open(struct inode *inode, struct file *file)
```

Operaciones que realiza un archivo, al abrir, al leer, etc.

```c++
static const struct file_operations cpu_fops = {
  .owner   = THIS_MODULE,
  .open    = cpu_proc_open,
  .read    = seq_read,
  .llseek  = seq_lseek,
  .release = single_release,
};
```

En el macro init se establece el mensaje de inicio del modulo, y se manda a crear el archivo **cpu_grupo16** a la carpeta /proc y se agrega las opciones cuando el archivo se abra o se lee. El macro exit remueve el archivo **cpu_grupo16**.

```c++

/*
 * Inicio del modulo
 */
static int __init cpu_grupo16_init(void)

/*
 * Salida del modulo
 */
static void __exit cpu_grupo16_exit(void)

```

## Módulo de Memoria

Método que obtiene los datos de la memoria RAM, se obtiene el archivo en donde se escribirán los datos.

```c++

/*
 * Metodo que obtiene los datos de la memoria RAM
 * @param file archivo donde se va escribir
 */
static int read_memorie(struct seq_file *file, void *v)
```

Método que reacciona al abrir el archivo del proceso

```c++
static int mem_open(struct inode *inode, struct file *file)
```

Operaciones que realiza un archivo, al abrir, al leer, etc.

```c++
static const struct file_operations mem_fops = {
  .owner   = THIS_MODULE,
  .open    = mem_open,
  .read    = seq_read,
  .llseek  = seq_lseek,
  .release = single_release,
};
```

En el macro init se establece el mensaje de inicio del modulo, y se manda a crear el archivo **mem_grupo16** a la carpeta /proc y se agrega las opciones cuando el archivo se abra o se lee. El macro exit remueve el archivo **mem_grupo16**.

```c++

/*
 * Inicio del modulo
 */
static int __init mem_grupo16_init(void)

/*
 * Salida del modulo
 */
static void __exit mem_grupo16_exit(void)
```

## Contenido de archivos Makefile

```makefile
obj-m += <modulo>.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clear:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

start:
	sudo dmesg -C
	sudo insmod <modulo>.ko
	dmesg

show:
	cat /proc/<modulo>

stop:
	sudo rmmod <modulo>.ko
	dmesg

```

<br>

### Compilar archivos

```bash
make all
```

### Limpiar entorno

```bash
make clear
```

### Crear proceso

```bash
make start
```

### Mostrar contenido del archivo

```bash
make show
```

### Detener proceso

```bash
make stop
```

## Aplicación web

### Archivos \*.go

#### commons_io.go

Archivo Que se contiene metodos para leer un archivo y retornar un arreglo de strings

Metodo readLines: lee el contenido del archivo y los divide por una nueva línea.

```go
func readLines(filename string) ([]string, error)
```

Metodo readLinesOffsetN: lee el contenido del archivo y los divide por una nueva línea. Offset, indica en qué número de línea comenzar. El contador determina el número de líneas para leer (comenzando desde el desplazamiento): n >= 0: a lo sumo n líneas n < 0: archivo completo

```go
func readLinesOffsetN(filename string, offset uint, n int) ([]string, error)
```

#### main.go

Este archivo contiene la creacion del socket que comunicara al cliente con el servidor, define las rutas con las cuales se obtienen la informacion del cpu, ram y procesos.

Funcion main: metodo principal que es la que inicia el flujo de la aplicación, en ella se instancia el socket con una llamada a otra funcion, y se establece un hilo para correr el servidor para mantener escuchando las peticiones del cliente.

```go
func main()
```

Metodo createServerSocket: devuelve el puntero del servidor creado, y un posible error, instancia el socket y define sus rutas mediante el metodo socket.OnEvent("/",(ruta))

```go
func createServerSocket() (*socketio.Server, error) {

    //Metodo que establece la conexion con el cliente, recibe el socket que recibio la peticion
    server.OnConnect("/", func(s socketio.Conn) error {


    //Metodo que define la ruta con la cual se recibe la peticion desde el cliente, recibe el
    //socket que recibio la peticion
    server.OnEvent("/", nombre_peticion, func(s socketio.Conn, msg string) {


    //envia al cliente en esa ruta, la informacion que necesitemos en este caso enviamos json.
    s.Emit(nombre_peticion, json)

    //Metodo del socket para desconectarse del cliente, no ejecuta nada
    server.OnDisconnect("/", func(s socketio.Conn, msg string) {})
```

#### processes.go

Funcion getInfoProcs: esta funcion retorna el struct que contiene toda la informacion al cliente, el cual lee un archivo con extensión "csv", generado por el modulo del CPU llamado cpu_grupo16.csv, el cual contiene toda la información necesaria de los procesos (PPID, PID, NAME, USER, MEM, STATUS), y con ello se genera un arbol de procesos.

```go
func getInfoProcs() *ProcsInfo
```

Método seeTreeProcess: recibe un proceso y una identacion y lo unico que realiza es que imprime su información, y si el proceso cuenta con hijos se vuelve a llamar por cada hijo.

```go
func seeTreeProcess(proc *Proc, tab string)
```

Método addHijo: Recibe la lista de todos los procesos leido, y recibe el proceso hijo, busca en todos los procesos el proceso padre y se lo añade al hijo, para formar la estructura de arbol de procesos.

```go
func addHijo(procs []*Proc, child_proc *Proc)
```

#### ram.go

Este archivo obtiene de la memoria ram

Struct MemoryConsumed: esta estructura contiene atributos necesarios para retornar la informacion al cliente sobre el estado de la memoria ram, (el total en Mb, el uso, el porcentaje de uso).

```go
type MemoryConsumed struct {
	Total   string  `json:"total"`
	Percent string `json:"percent"`
}
```

Funcion calculate(): funcion propia de la estructura ram y se encarga de llenar y retornar la informacion de la misma, lee el archivo /proc/mem_grupo16 para ello.

```go
func (consumed *MemoryConsumed) calculate() error
```

Funcion getTotalRAM: retorna el total de memoria ram del servidor en Mb

```go
func getTotalRAM()(string, error)
```

### **Carpeta public**

Contiene los archivos que utilizará el cliente, en ella se encuentra los archivos \*.html
y tambien otras 2 carpetas

### **Carpeta css**

Contiene los archivos css, que utilizaran nuestros archivos \*.html

### **Carpeta js**

Contiene los archivos js, que utilizaran nuestros archivos \*.html

## Stress Comands

```bash
sudo stress --cpu  8 --timeout 20
sudo stress --vm 1 --timeout 60s
sudo stress --cpu 4 --io 3 --vm 2 --vm-bytes 256M --timeout 20s
```