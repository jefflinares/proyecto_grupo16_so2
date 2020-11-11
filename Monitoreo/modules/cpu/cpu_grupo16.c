#include <linux/fs.h>
#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/list.h>
#include <linux/seq_file.h>
#include <linux/list.h>
#include <linux/proc_fs.h>
#include <linux/slab.h>
#include <linux/string.h>
#include <linux/types.h>

/*
 * Metodo recursivo para leer cada proceso
 *
 * @param file archivo donde se va escribir
 * @param task_parent proceso padre
 * @param pid_parent PID del proceso padre
 */
void read_process(struct seq_file *file, struct task_struct *task_parent, pid_t pid_parent) {
  struct task_struct *task_children; // proceso hijo actual
  struct list_head *list_current; // Lista de procesos hijos del hijo actual
  unsigned long total_vm = 0; // Total de memoria usada por el proceso hijo actual
  char state[20]; // Estado del proceso actual

  // Se utiliza, para convertir los estados de numeros
  // A su correspondiente 
  switch(task_parent->state) {
    case TASK_RUNNING:
	    strcpy(state, "Running");
	    break;
    case TASK_INTERRUPTIBLE:
      strcpy(state,"Sleeping");
      break;
    case TASK_UNINTERRUPTIBLE:
      strcpy(state,"Uninterrumpible");
      break;
    case EXIT_ZOMBIE:
      strcpy(state, "Zombie");
      break;
    case TASK_STOPPED:
      strcpy(state, "Stopped");
      break;
    default:
      strcpy(state, "Unknown");
  }
  
  // Si la estructura de memoria es nula la cantidad de
  // memoria utilizada es igual a cero
  if (task_parent->mm != NULL) {
    total_vm = task_parent->mm->total_vm;
    total_vm = total_vm << (PAGE_SHIFT - 10);
  }

  // Se manda a guardar el archivo
  seq_printf(
    file,
    "%d, %d, %s, %d, %s, %lu\n",
    pid_parent, task_parent->pid, task_parent->comm,
    task_parent->cred->uid.val, state,
    total_vm
  );

  list_for_each(list_current, &task_parent->children) {
    task_children = list_entry(list_current, struct task_struct, sibling);
    read_process(file, task_children, task_parent->pid);
  }
}

/*
 * Metodo que imprime los procesos y busca el proceso padre
 * el cual la contiene la variable init_task
 */
static int task_tree(struct seq_file *file, void *v) {
  seq_printf(file, "PID_PADRE, PID, NOMBRE, USUARIO (UID), ESTADO, RAM CONSUMIDA (KB)\n");
  read_process(file, &init_task, -1);
  return 0;
}

/*
 * Metodo que reacciona al abrir el archivo del proceso
 */
static int cpu_proc_open(struct inode *inode, struct file *file) {
  return single_open(file, task_tree, NULL);
}

/*
 * operaciones que realiza un archivo, al abrir, al leer, etc.
 */
static const struct file_operations cpu_fops = {
  .owner   = THIS_MODULE,
  .open    = cpu_proc_open,
  .read    = seq_read,
  .llseek  = seq_lseek,
  .release = single_release,
};

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Grupo 16");
MODULE_DESCRIPTION("Administrador de Procesos y Arbol de procesos");
MODULE_VERSION("0.1.0");

/*
 * Inicio del modulo
 */
static int __init cpu_grupo16_init(void) {
  printk(KERN_INFO "Administrador de Procesos y Arbol de procesos, del grupo 16\n");
  proc_create("cpu_grupo16", 0, NULL, &cpu_fops);
  return 0;
}

/*
 * Salida del modulo
 */
static void __exit cpu_grupo16_exit(void) {
  remove_proc_entry("cpu_grupo16", NULL);
  printk(KERN_INFO "Fin del administrador de Procesos y Arbol de procesos, del grupo 16\n");
}

module_init(cpu_grupo16_init);
module_exit(cpu_grupo16_exit);
