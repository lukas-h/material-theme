---
layout: post
title:  "Outreachy and the Value of Distractions"
date:   2019-07-07 14:50:00 +0530
tags: ['outreachy', 'code']
author: "Nishka Dasgupta"
---

When I applied to Outreachy, I divided the three-month period into 4 sections of approximately three weeks each. I thought I would begin by removing unused variables, then unused 
functions, and finally plug memory leaks and protect structures. Right from the beginning, I had to adjust my expectations. As I have explained 
[here](https://nishkadg.github.io/2019/06/07/struggle.html), removing variables turned out to be much trickier than I had anticipated. Nonetheless, I persevered in trying to find 
something, anything, that I could remove.

In the course of looking for variables, I noticed quite by accident that a great many functions were doing nothing except calling another function with the same arguments and nearly 
the same name. The called functions were usually static, and called by few others, whereas the wrapper functions tended to be non-static and frequently-called. Further, a lot of the 
pointer variables have names beginning with "p", just as a lot of Boolean variables and functions have an extra "b" somewhere in their names. As I discovered more and more of these other 
tasks to work on, it wasn’t long before I had to adjust my schedule to fit these in as well. I even wrote Coccinelle and bash scripts to automate my search for some of these patterns.

While it may seem as though a deviation would delay my progress (and it certainly did seem so at the time), all these extra tasks turned out to be surprisingly useful. For instance, 
when I merged a wrapper function and its called function, I was ultimately removing one of the two. When trying to change the return values of a function, I often had to use grep to 
find its call sites, and that gave me unexpectedly useful information about whether the return value was ever used, or even whether the function itself was ever called. This eventually
 translated into a head-start on the function-removing part of my plan, as I had started working on these tasks while I was technically supposed to be focusing on variable removal.

Over most of June, I finally focused on removing unused functions as I had originally planned. On at least one occasion, a file with over 30 functions was left with fewer than 10 – 
with most of the removed functions being wrapper functions. I made a tremendous amount of progress in those three weeks, helped in no small part by the groundwork set by my earlier 
"distractions". 

Even those "distractions" not directly related to my planned work were useful in providing me with something useful to do in between what I had planned. As with any work, there were 
days when I had trouble focusing on the same task that I had been slogging away at for several weeks. Instead of not working on those days, I was able to simply work on these 
"distracting" tasks – they were still useful contributions that needed to be worked on, but they provided enough variation in my daily routine that I was able to continue putting in 
40 hours of work every week.

Now, I am entering the second half of my internship, where I will be handling memory leaks and structures. As with the unused variables, I could not find too many memory leaks within 
the staging subsystem (the subsystem on which I had been working all this time) and so, at the encouragement of my mentor, I have expanded my search to other parts of the Linux kernel.
 I still have a list of tasks that I hadn’t initially planned on working on, as well. I’m saving those for a rainy day for now. After all, just because they are unplanned, does not mean
 they were never worth doing.
