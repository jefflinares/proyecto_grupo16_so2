#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>
#include <linux/hugetlb.h>
#include <linux/mm.h>
#include <linux/mman.h>
#include <linux/mmzone.h>
#include <linux/syscalls.h>
#include <linux/swap.h>
#include <linux/swapfile.h>
#include <linux/vmstat.h>
#include <linux/atomic.h>

#define MEGABYTE 1024

/*
 * Metodo que obtiene los datos de la memoria RAM
 */
static int read_memorie(struct seq_file *file, void *v) {
  #define convert(x) ((x) << (PAGE_SHIFT - 10))
  struct sysinfo info;
  long totalram;
  long freeram;
  long used;
  long used_percent;
  si_meminfo(&info);
  totalram = convert(info.totalram) / MEGABYTE;
  freeram = convert(info.freeram) / MEGABYTE;
  used = totalram - freeram;
  used_percent = (used * 100 / totalram * 100) / 100;
	seq_printf(file, "Memoria total: %lu MB\n", totalram);
  seq_printf(file, "Memoria consumida: %lu MB\n", used);
	seq_printf(file, "Porcentaje usado: %ld%%\n",  used_percent);
  #undef K
  return 0;
}

/*
 * Metodo que reacciona al abrir el archivo del proceso
 */
static int mem_open(struct inode *inode, struct file *file) {
  return single_open(file, read_memorie, NULL);
}

/*
 * operaciones que realiza un archivo, al abrir, al leer, etc.
 */
static const struct file_operations mem_fops = {
  .owner   = THIS_MODULE,
  .open    = mem_open,
  .read    = seq_read,
  .llseek  = seq_lseek,
  .release = single_release,
};

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Grupo 16");
MODULE_DESCRIPTION("Monitor de Memoria");
MODULE_VERSION("0.1.0");

/*
 * Inicio del modulo
 */
static int __init mem_grupo16_init(void) {
	printk(KERN_INFO "Hola mundo, somos el grupo 16 y este es el monitor de memoria.\n");
	proc_create("mem_grupo16", 0, NULL, &mem_fops);
	return 0;
}

/*
 * Salida del modulo
 */
static void __exit mem_grupo16_exit(void) {
	remove_proc_entry("mem_grupo16", NULL);
	printk(KERN_INFO "Sayonara mundo, somos el grupo 16 y este fue el monitor de memoria.\n");
}

module_init(mem_grupo16_init);
module_exit(mem_grupo16_exit);
