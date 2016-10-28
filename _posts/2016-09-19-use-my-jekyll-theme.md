---
layout: post
title:  "Use my jekyll theme"
date:   2016-09-19 22:10:00 +0200
tags: ['english', 'jekyll', 'theme']
author: "Lukas Himsel"
---

## Hints

If you want to use my jekyll theme, follow the instructions and host it yourself. Easily setup as a Github page.  

To add pages (for example a portfolio, an extra about page, and so on), you need to link them to the `index.html` manually. Required to configure in this dimensions is a bit of html and jekyll know-how. Reading the [Jekyll docs](http://jekyllrb.com/docs/pages/) helps. All other things are easy to edit and configure, even without much jekyll experience.  

Please use the branch *theme* of the repo, please not the *master* branch.
If you want to use the *master* branch (for example, you simply fork the website), please remove/reedit the google analytics tracking ID from `_config.yml`. Please remove the `CNAME` (or change the domain) too.

#### CHANGE THE GOOGLE ANALYTICS ID  
You *have to* change the value of `g_analytics` in _config.yml.


#### Theme features  
- Projects showcase  
- RSS and ATOM feed  
- Blogpost pagination  
- SEO meta tags, *schema.org* structured data  
- [twitter](https://dev.twitter.com/cards/getting-started) cards  
- made with MaterializeCSS
- Disqus comments  

## Setup

### 1. Get the sources

#### 1.1 Clone

Clone the repository from github:  
[https://github.com/lukas-h/lukas-h.github.io.git](https://github.com/lukas-h/lukas-h.github.io.git)  
Checkout the branch *theme*, by typing `git checkout theme`.

#### 1.2 download  
Get the branch *theme* from my repository:  
[https://github.com/lukas-h/lukas-h.github.io/archive/theme.zip](https://github.com/lukas-h/lukas-h.github.io/archive/theme.zip)  

### 2. Configure  
- Replace all the configuration in `_config.yml` and `_data/projects.yml` by your own data. Change the name, email address, configure your your language settings.  
And most important: change the site's URL! Optionally add your google analytics ID.

- Put your address and legal info into `imprint.html`.  

- Change the icon `images/favicon.png`.  

- Remove or edit the `CNAME` file that it does not point anymore to *himsel.me*.  

- Don't forget the `README.md`.  

### 3. Start writing posts  
Replace the existing example post and then add your own!  
Have a look at the [Jekyll docs](http://jekyllrb.com/docs/posts/)
about how to write blog posts.  
To add tags to your posts, look into the example, you'll see that there is
a line starting with `tags:`. Add your keywords there. 

### 4. You're done  
Take a stop on the Github project page. Feel free to give a star and share it with others!  
You have questions, feedback or something to improve, mail me or open issues on github. Contributions are always welcome.  
Thanks to them who have already helped to improve, especially [@varundey](https://github.com/varundey)!  
See the [Github Project](https://github.com/lukas-h/lukas-h.github.io)  