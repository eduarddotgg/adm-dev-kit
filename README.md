<img title="Dev Kit" src="https://raw.githubusercontent.com/admdh/adm-dev-kit/2.x-dev/_dev-kit-logo.svg">  
# ADM DEV KIT 2.0
[![Join the chat at https://gitter.im/admdh/adm-dev-kit](https://badges.gitter.im/admdh/adm-dev-kit.svg)](https://gitter.im/admdh/adm-dev-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  
  
    
      
#### ADM DEV KIT - Component Driven Static Website Development Tool.

## Documentation
- Introduction (coming soon)
- Installation (coming soon)
- Configuration (coming soon)
- Getting started (coming soon)
- Examples (coming soon)


## Quick guide

###### Working Directory
All project's files are stored in ```/src```.

##### Template Engine.
Pug (jade) is used as main template engine. You can find out more information about Pug by following this link [https://github.com/pugjs/pug](https://github.com/pugjs/pug).  

Example of basic ```index.pug```:
```jade
extends _layouts/_main

block title
	title ADM DEV KIT

block content
	link(href="_common/_common-index.css" type="text/css" rel="stylesheet")
	script(src="jspm_packages/system.js" type="text/javascript")
	script(src="config.js" type="text/javascript")
```

##### JS
JSPM is used as JavaScript manager and bundler. You can find more information about JSPM by following this link [http://jspm.io](http://jspm.io). Every single component has it's own JS file to add it use following syntax::
```jade
.component-box
    .component-box__content
        ...
        
script System.import('component.js') //your components js file
```
IMPORTANT to know path in ```System.import``` should be relative to ```/src``` directory.

##### CSS
PostCSS is used as main pre/post processor for CSS. You can find more information about JSPM by following this link [https://github.com/postcss/postcss](https://github.com/postcss/postcss). Every single component has it's own CSS file to add it use following syntax:
```jade
link(href="component.css" type="text/css" rel="stylesheet")
.component-box
    .component-box__content
        ...
``` 
IMPORTANT to know path in ```link(href="...")``` should be relative to ```/src``` directory.


##### Configuration
Some settings can be changed in ```package.json```
```json
"host": "adm-dev-kit"
"port": 3000
```

##### Installing Dependencies
```js
npm i       // install all npm pacakges
jspm i      // install other dependencies
```

##### Starting Server
```js
npm start

// by default "http://adm-dev-kit:3000" url will be opened in default browser.
```
