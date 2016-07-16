# Introduction
Important to know - ADM DEV KIT is not aimed to replace any of existing tools of frameworks!

## Prelude
Component driven development. Components help to keep project easy scalable and maintainable. With components there are no big files that include whole world. 

There are many ways how to develop in component driven way. There are also a lot of tools and frameworks that help to develop in component driven way. Some of them are SPA (single page applications), some of them offer recipes that personally i don’t really like. So I decided to build my own tool that will satisfy my needs. Of course I’m open mind to improvements and pull requests.

## Main Idea
Main idea is to provide component driven development with components that are separated from each other and at the same time generate normal, non SPA (single page application), website with it’s HTML, JS and CSS. Let’s take a look at some example for better understanding. 

## Examples
### Vanila Project
First of all let’s look on usual some website project file structure. As a usual it can be separated it on few parts:
- html
- js
- css
- assets (fonts, images, etc).
So the very basic project structure will look like this:
```
assets/
	| - css/
		| - main-style.css
	| - js/
		| main-script.js
	| - images
index.html
```
Pros:
- …
Cons:
Problem with this kind project structure is that it’s hard to maintain it, it’s hard to optimise it, etc, etc, etc. And I think mostly no-one develops projects in this way.

### Project with template engines, pre and post processors
Template engines, pre and post processors - deeply penetrated into the life of developers. Project’s structure differs a little bit but mostly stays the same:
```
assets/
	| - sass
		| - component-1
			| - component-1.sass
		| - component-2
			| - component-2.sass
		| - imports.sass // imports component-1.sass, component-2.sass
	| - js
		| - component-1
			| - component-1.js
		| - component-2
			| - component-2.js
		| - browserify // imports component-1.js, component-2.js
	| - jade
		| - component-1.pug
		| - component-2.pug
index.pug // imports component-1.pug, component-2.pug
```
Pros:
This project structure is more complicated, but on the other hand it has some advantages like components with smaller files.
Cons
As project grows it gets harder to control built files. It’s especially turn into big problem when more than one developer works on one project. Often happens that some unused components still continue to be part of project. And to remove those components EJS, JS, CSS should be synced.

### SPA (single page application)
SPA’s project structure:
```
component-1/
	| - component-1.pug
	| - component-1.sass
	| - component-1.js // includes component-1.pug, component-1.sass
component-2/
	| - component-2.pug
	| - component-2.sass
	| - component-2.js // includes component-2.pug, component-2.sass
app.js // includes component-1, component-2
```
Pros:
SPA provides true component driven development. It’s really easy to maintain projects, reuse components, etc.
Cons:
The main problem with SPA is that it is single page application, this means that everything is bundled to js file.

### ADM DEV KIT
ADM DEV KIT is mostly like SPA, but it doesn’t bundles everything into one JS file. Instead it builds everything separately. Let’s look closer how it works.
Basic ADM DEV KIT project has main files that represents websites main section like “Home Page”, “About Page”, “Contacts”, etc. Let’s we would like to develop “Home Page” which could be ```index.pug``` which includes some ```hello-world``` component.
Project structure can be something like this:
```
index/
	| - hello-world/
		| - hello-world.pug
		| - hello-world.js
		| - hello-world.css
index.pug
```

```index.pug```:
```
extends _layouts/_main.pug
block title
	title ADM DEV KIT

block content
	script(src='__jspm_packages/system.js' type='text/javascript')
	script(src='_jspm-config.js' type='text/javascript')

	include index/hello-world/_hello-world
```

```hello-world.pug```
```
link(href='index/hello-world/_hello-world.css' type='text/css' rel='stylesheet')
.hello-world
	h1 Hello, World!

script System.import('index/hello-world/_hello-world.js')
```
As you can see ```hello-world.pug``` includes it’s CSS and JS files.

```hello-world.js```
```
console.log('Hello, World!')
```

```hello-world.css```
```
.hello-world {
	display: block;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
}
```

This gives you ability to use components while you develop.

After you run build tasks everything included into main fails will be built in separate files, in our ```hello-world``` example after build we will get:
```
	assets
		| - css
			| - index.min.css
		| - js
			| - index.min.js
index.html
```
```index.pug``` file was compiled to ```index.html``` which has it’s own js file ```index.min.js``` and it’s own css file ```index.min.css```.  
Important to know that into result css or js file will be only compiled that was included into main file like ```index.pug```. So if ```hello-world``` include will be removed from ```index.pug```, ```hello-world```’s css and js won’t be compiled. 
