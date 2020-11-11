obj-m += mem_grupo16.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clear:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

start:
	sudo dmesg -C
	sudo insmod mem_grupo16.ko
	dmesg

show:
	cat /proc/mem_grupo16

stop:
	sudo rmmod mem_grupo16.ko
	dmesg
