# ADM DEV KIT 2.0 coming soon!!!

[![Join the chat at https://gitter.im/admdh/adm-dev-kit](https://badges.gitter.im/admdh/adm-dev-kit.svg)](https://gitter.im/admdh/adm-dev-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
  
    
      
# ADM DEV KIT
<img align="right" width="58" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-logo.png">
ADM DEV KIT (Gulp) - component driven static website starter kit.  
Starting tool for component driven development using [Jade](https://github.com/jadejs/jade) + [PostHTML](https://github.com/posthtml/posthtml)-[BEM](https://github.com/rajdee/posthtml-bem) and [PostCSS](https://github.com/postcss/postcss).

## Problem.
While developing static website all HTML, JS and CSS dependencies are stored in different places and included into different files.
<img width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--non-modular-dependencies.png">    
So for example if You would like to delete some html fragment, You will have to delete it's JS and CSS somewhere else which can take some time until you find it and understand which part of JS or CSS exactly belongs to that html fragment. Sometimes we or our colleagues after deleting some html fragment forget to delete it's JS or CSS, so we have some not used JS and CSS which only generates file size sometimes make cause some errors.

## Solution.
As a solution to that i would like to offer component driven development for static websites.
<img align="right" width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--modular-dependencies.png">  
Component driven development can make our dependencies handling much easier. You can keep all component's related JS and CSS dependencies in one place.

## What is inside?
- [Gulp](https://github.com/gulpjs/gulp) as task runner (already includes tasks for minifying JS and CSS);
- [Express](https://github.com/strongloop/express) for serving static files;
- [Browser-Sync](https://github.com/BrowserSync/browser-sync) for sync browsing and browser refreshing;
- [Jade](https://github.com/jadejs/jade) as template language;
- [PostHTML-BEM](https://github.com/rajdee/posthtml-bem) for BEM naming structure;
- [PostCSS](https://github.com/postcss/postcss) as main pre/postprocessor for CSS;
- [MY IP UI](https://github.com/admdh/my-ip-ui) Custom built Qr-Code UI for easy opening on mobile devices.
- Basic css style for default html tags;

## Usage
Clone/fork or just download repository and install all node dependencies: 
```
$ npm i
```
Edit host name, port for Your own in package.json.
Than run:
```
$ npm start
```
Open in Your browser:
```
http://localhost:3000
```

## Showcase
#### Example of dev file structure:
```
webroot
	|- _common (contains common/global CSS and JS)
		|- common (CSS files for reseting style of default HTML tags)
		   common-index.css (CSS file that contains only those common css styles that are only important/related for index.jade file)
		|- header
			|- img
			   header.jade
			   header.js
			   header.css
		|- footer
			|- img
			   footer.jade
			   footer.js
			   footer.css
	|- _layouts (layouts for JADE templating)
		main.jade (main template file)
	|- index (contains all components used in index.jade file)
		|- slider
			|- img (images folder)
			   slider.jade
			   slider.js
			   slider.css
		|- news-box
			|- img (images folder)
			   news-box.jade
			   news-box.js
			   news-box.css
	index.jade
	variables.yml (CSS variables)
```
  
#### Example of markup:
main.jade - lauout file
```jade
doctype html
html
	head
		meta(charset='UTF-8')
		meta(name='viewport', content='width=device-width, initial-scale=1')
		block title
			title Main Layout
		//- CSS will be included here
		css
	body
		block content
		//- JS will be included here
		js
```

index.jade
```jade
extends ./_layouts/main.jade

block title
	title ADM DEV KIT

block content
	link(href='_common/common-index.css')
	include index/slider/slider.jade
```

index/slider/slider.jade
```
link(href='index/slider/slider.css')
script(src='index/slider/slider.js')
div(block='slider')
	div(elem='item')
		img(src='img/slide-img-1.jpg')
	div(elem='item')
		img(src='img/slide-img-2.jpg')
	div(elem='item')
		img(src='img/slide-img-3.jpg')
```

#### Example of dest file structure:
```
dest
	|- assets
		|- css
		   index.css
		|- js
		   index.js
		|- img
		   slide-img-1.jpg
		   slide-img-2.jpg
		   slide-img-3.jpg
	index.html
```
