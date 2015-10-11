# ADM DEV KIT (Gulp)
<img align="right" width="57" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-main-logo.png">
ADM DEV KIT (Gulp) - modular static website starter kit (jade/postcss).  
.  
.  

### Problem
Lately Front-end is evolving really fast. New and better technologies, methodologies are developed every day. They give us new experience, new abilities, new ways to develop.
But meanwhile we still need to make develop static websites. And unfortunatly not every new technologies and methodologies can fit in static website development for 100%.
One of such methodologies is - modularity.  
So the main problem is that modularity in static website development is not used for 100%. All HTML, JS, CSS files are stored separatly and maintained not the best way. 
  
### Solution
So I decided to create modular static website starter kit. The main idea is to make project modular with independent components. So after some researches I have made a gulp task that can handle components.
All components are independent. One component can contain html, js, css and image files which are stored in separate folders. Main file of any component is jade file which includes js, css, images. To compile component component's main jade file should be included to main file for example index.jade.
  
## Usage
Clone/fork or just download repositry and than just run: 
```
$ npm i
$ npm start
```
Open in Your browser
```
http://localhost:8888
```

## Showacse
file structure
```
src
	|- _common
		|- header
			|- img
				|- main-logo.png
			|- header.jade
			|- header.js
			|- header.css
		|- footer
			|- img
				|- footer-logo.png
			|- footer.jade
			|- footer.js
			|- footer.css
	|- _global
		|- global-css
		|- global.js
		|- global.css
	|- _layouts
	|- index
		|- text
			|- img
				|- dev-kit-logo.png
			|- text.jade
			|- text.js
			|- text.css
	|- index.jade
	|- variables.yml
```
index.jade
```
extends ./_layouts/main.jade

block title
	title Home Page

block content
	.row
		h1 Hello World!
		include index/text/text.jade
```
index/text/text.jade - component:
```
link(href="index/text/text.css") - include components css file
script(src="index/text/text.js") - include components js file
.text
	img(src="img/dev-kit-logo.png")
	p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
All this will be compiled too:  
index.html
```html
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="assets/css/index.css" />
    <title>Home Page</title>
</head>

<body>
    <div class="row">
        <h1>Hello World!</h1>
        <script src="index/text/text.js"></script>
        <div class="text"><img src="assets/img/dev-kit-logo.png">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    <script src="assets/js/index.min.js"></script>
</body>

</html>
```
index.css
```css
.text{
	display:block;
	padding:20px;
	width:100%
}
@media screen and (min-width:40.063em){
	.text{
		padding:0
	}
}
```
index.min.js
```js
!function(){var l={sayHello:function(){alert("Hello World")}};l.sayHello()}();
```

