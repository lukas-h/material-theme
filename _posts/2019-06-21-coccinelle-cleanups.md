---
layout: post
title:  "Coccinelle Cleanups in the Linux Kernel"
date:   2019-06-21 20:10:00 +0530
tags: ['outreachy', 'code']
author: "Nishka Dasgupta"
---
The Linux kernel is open source, meaning that anyone can submit edits to it at any point. In the past 4 weeks alone, over 130 people have had their changes accepted into just one of the branches of the kernel. Seeing as the kernel is, well, older than I am, that roughly equates to a truly mind-boggling number of people who have ever contributed to it.

Of course, with any project involving so many people over decades, some redundancies are likely to creep in. Perhaps someone will declare a variable, or even a whole function, that they wind up not using. Perhaps they will write a function `do_something()`, that uses a result from another function, `get_something()`; then later someone comes along and removes all the lines from `do_something()` except the bit where it calls `get_something()`. One driver will define the success signal as `1` and the failure signal as `0`; but another might define it the other way around. 

These little redundancies don’t have any impact on the correctness of the code itself. What does a compiler care if there is one more integer variable, just one more byte, that it has to keep track of? However, as Linux developers like to point out, the Linux kernel code it meant to be understood by humans first, compilers second. While an unused variable does no harm whatsoever to the code itself, it is still one extra label that anyone reading the code will have to keep track of. Often, this kind of redundancy becomes just another barrier to newcomers to the community who are still getting familiar with the codebase. How can we find and remove these issues?

This is where my project for Outreachy comes in. My project is Coccinelle Cleanups in the Linux Kernel, which means I look for cases like the ones above – and more – and see how I can fix them. For that I’m using scripts written in the amazingly useful language Coccinelle. 

Coccinelle is a language that makes it possible to search for complex patterns in any C file or directory, while still having syntax that is easy to understand at first glance (unlike many regular expressions). For example, the following Coccinelle script immediately separates out all variables whose initial values are never used:

`@@identifier i1; type T; expression e1, e2;@@`

`-	T i1 = e1;`

`… when != i1`

`(i1 = e2;`

`|`

`? return <+…i1…+>;)`

An identifier is a name, like a variable name or function name; while type and expression have their usual meanings. Then `T i1 = e1`; tells the program to look for a line following the general form `type name = expression`. The ‘-‘ next to this line in the script suggests that we don’t want any variables of this form (i.e. declared and initialized in the same line), provided the following conditions are met: the variable `i1` does not occur again unless it is either assigned a new value `e2`, or returned. In cases such as these, we can remove the initial assignment and just have a simple variable declaration.

If you want to learn more about Coccinelle, I encourage you to look up the excellent tutorials [here] (http://coccinelle.lip6.fr/rules/) and [here] (http://coccinelle.lip6.fr/papers/tutorial.pdf).

What I find most exciting and most terrifying about this project is its scope. I’m not trying to build something new or focusing on any one directory or driver – I’m looking for redundant code in as many drivers as possible. This means I’m slowly piecing together a broad overview of the Linux kernel and its component parts. The Realtek drivers have been particularly fascinating – there are five of those, and they have both an interesting similarity (including, often, identical functions) as well as distinct differences (the differences in success/failure return values that I mentioned above show up among these drivers).

The sheer amount of things to work on also means that I am rarely idle. For instance, if I am stuck on a Coccinelle script for finding unused functions, then I can always take a break by working on some success/failure modifications. There’s no necessary order to cleanup tasks – it’s not necessary that the redundant variables be removed before the redundant functions – so it does give me a lot of flexibility to explore the kernel and find out what needs doing. One task that I had honestly not anticipated working on is wrapper functions: when a function does literally nothing except call another one. I noticed a few of those by accident while deleting unnecessary variables that my Coccinelle script had flagged. My curiosity piqued, I had soon written a Coccinelle script just for these wrapper functions, and I ended up spending almost a whole week removing them. 

Given the nature of the Linux kernel, my work has also strengthened my knowledge of C and git. Now I even have a better understanding of what human-readable code means, which is indispensable to understanding when Coccinelle has flagged the appropriate sections, and when it’s giving me false positives that are better left untouched.

All of us, will, at some point, join a team with an existing codebase; it’s not often that the original developers will be around to explain everything. In those cases, Coccinelle is invaluable in quickly finding patterns in code. The more accustomed I grow to Coccinelle, the more amazed I am at how intuitive and convenient it is. I fully intend to keep using it after this internship is over, and perhaps not just for Linux patches. 