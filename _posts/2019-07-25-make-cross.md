---
layout: post
title:  "Cross-compiling in the Linux Kernel"
date:   2019-07-25 10:45:00 +0530
tags: ['outreachy', 'code']
author: "Nishka Dasgupta"
---

The Linux kernel, by necessity, needs to run on a wide variety of architectures. However, by default, the kernel is compiled for the native architecture of the machine doing the 
compiling (x86_64 in my case). Compiling it specifically for other architectures requires cross-compiling. In this post, I will discuss how to successfully cross-compile any program 
for any architecture in the Linux kernel. I will be using the default version of make on my laptop, as well as the script 
[make.cross](https://github.com/bhumikagoyal/Cross-compile-kernel-drivers).

# Architecture: A brief overview

Computing devices (from smartphones to supercomputers) run on many kinds of hardware. Some of the more common architectures for this hardware are ARM, x86 and x86_64. 
ARM takes advantage of Reduced Instruction Set Computing (RISC) to make do with fewer transistors, which is why it’s used in most mobile devices. Laptops and PCs, on the other hand, 
commonly use x86 (where the smallest memory chunk is 32 bits) or x86_64 (where the smallest memory chunk is 64 bits). We see that when downloading some software for our laptops or 
PCs, there will often be options even underneath the operating system, asking us whether we want the 32-bit version or the 64-bit one. There are, however, no such options when 
downloading apps for our phones through the designated app store. 

# Compilers

Naturally, when a program is run, it needs to be translated into instructions that will be understandable for the architecture on which it is being run. In C, compilers do that work 
for the programmer, so that the programmer can get away with writing a single version of the program that can be compiled as needed to match the local architecture.

# Cross-compiling: make and make.cross

Let’s start with a specific file: drivers/staging/rtl8712/rtl871x_mlme.c, because I have a fondness for the rtl8712 driver. I want to compile it for ARM, but my laptop architecture 
is x86_64. I’m going to attempt it in two ways: with the default make script, and with make.cross. 

## make with native architecture 

First I compile it normally for my native architecture (x86_64):

`$ make ARCH=x86_64 allyesconfig drivers/staging/rtl8712/rtl871x_mlme.o`

As we can see, "ARCH=" is for specifying the architecture, and "allyesconfig" sets all the configuration options to "yes" by default so I don’t have to hit "y" a few dozen times 
before the compilation actually begins.

The above command is the same as running:

`$ make allyesconfig drivers/staging/rtl8712/rtl871x_mlme.o`

since x86_64 is the native architecture on my laptop.

This command works; there are no errors and by the end of it the output file drivers/staging/rtl8712/rtl871x_mlme.o exists on my laptop. So far, so good.

## make and ARM

Now let’s try it for ARM.

`$ make ARCH=arm allyesconfig drivers/staging/rtl8712/rtl871x_mlme.o`

Right away, things start going wrong:

`scripts/kconfig/conf  --allyesconfig Kconfig`
`#`
`# configuration written to .config`
`#`
`scripts/kconfig/conf  --syncconfig Kconfig`
`  HOSTCC  scripts/selinux/mdp/mdp`
`  CC      scripts/mod/empty.o`
`gcc: error: unrecognized argument in option '-mabi=aapcs-linux'`
`gcc: note: valid arguments to '-mabi=' are: ms sysv`
`gcc: error: unrecognized command line option '-mbig-endian'`
`gcc: error: unrecognized command line option '-mapcs'; did you mean '-maes'?`
`gcc: error: unrecognized command line option '-mno-sched-prolog'; did you mean '-Wno-sign-promo'?`
`gcc: error: unrecognized command line option '-mfpu=vfp'; did you mean '-mcpu='?`
`make[2]: *** [scripts/Makefile.build:274: scripts/mod/empty.o] Error 1`
`make[1]: *** [Makefile:1119: prepare0] Error 2`
`make: *** [Makefile:330: __build_one_by_one] Error 2`

### Why is this happening?

Let’s take a look at my version of make:

`$ make --version`
`GNU Make 4.2.1`
`Built for x86_64-pc-linux-gnu`

There’s the problem. Even with the option "ARCH=arm", make is itself still a version for x86_64 architecture. That’s why it worked for "ARCH=x86_64".
 
## make.cross and ARM

If I want a successful compilation for ARM, I will need the right toolchain, the right versions of make and gcc, and so on. Thankfully, the file make.cross (available 
[here](https://github.com/bhumikagoyal/Cross-compile-kernel-drivers) already has all the necessary commands.

I run the file make.cross similarly to how I ran the usual make command:

`$ make.cross ARCH=arm allyesconfig drivers/staging/rtl8712/rtl871x_mlme.o`

It works! I get the compiled output file drivers/staging/rtl8712/rtl871x_mlme.o without so much as a warning.

# Why does make.cross work?

make.cross does not try to use the native gcc compiler to compile for a non-native architecture. Instead, it downloads the version of gcc compatible with the desired architecture, 
and then downloads the cross-compiler from either linaro or crosstool, as required. Finally, it compiles the given file(s) with the cross-compiler.

