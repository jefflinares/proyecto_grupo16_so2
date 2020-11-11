obj-m += cpu_grupo16.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clear:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

start:
	sudo dmesg -C
	sudo insmod cpu_grupo16.ko
	dmesg

show:
	cat /proc/cpu_grupo16

stop:
	sudo rmmod cpu_grupo16.ko
	dmesg