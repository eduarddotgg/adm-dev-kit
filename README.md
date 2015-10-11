# ADM DEV KIT (Gulp)
<img align="right" width="77" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-main-logo.png">
ADM DEV KIT (Gulp) - component driven static website starter kit (Jade/ PostCSS).  
Keep Your project modular. Make components independent.  
No need to include static files separatly. Just add you js, css, images to jade component. All static files will be compiled only if component is included into main file for example ```index.jade```.  
PostCSS is used as a css pre- and  postprocessor. PostCSS gives ability to keep all variables in separate file like yml so all css files are independent.  
   
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

## Example
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

