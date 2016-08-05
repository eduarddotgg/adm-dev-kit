<img title="Dev Kit" src="http://adm-designhouse.com/adm-dev-kit-logo.svg">  
# ADM DEV KIT 2.5.0
[![Join the chat at https://gitter.im/admdh/adm-dev-kit](https://badges.gitter.im/admdh/adm-dev-kit.svg)](https://gitter.im/admdh/adm-dev-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  

#### What is ADM DEV KIT?
ADM DEV KIT is component driven static websited development tool. It is built with Node.js, Express.js, Gulp.js, Pug.js, PostHTML, PostCSS and other smaller tools. ADM DEV KIT include pre configured development environment and build tasks to make development and deployment easier.  
Main idea is to give ability to develop in component driven way without React, Webpack or similar tools.
 

#### Features
- Component driven development with independent components;
- Development and build environment;
- Project Init Tool [ADM DEV KIT INIT PROJECT](https://github.com/admdh/adm-dev-kit-init-project)
- PostHTML for validation to w3c standards;
- JSPM for third party libraries;
- ESlint;
- CSS future syntax and future features with PostCSS;
- Stylelint;
- Precommit git hook for linting before commit;
- Common CSS for normalization default html tags out of box;
- MY-IP-UI helps to open project on other devices;
- and much more...

## Documentation
- [Introduction](https://github.com/admdh/adm-dev-kit/blob/2.5.0/_docs/introduction.md) 
- Installation and Configuration (coming soon)
- Getting started (coming soon)
- Examples (coming soon)

## Quick start

### Setting up project using ADM DEV KIT INIT PROJECT
Initialize your project in few simple steps using [ADM DEV KIT INIT PROJECT](https://github.com/admdh/adm-dev-kit-init-project). You can create project automatically or proceed through question form to get
##### Automatically:
![ADM DEV KIT INIT AUTOMATICALLY](https://raw.githubusercontent.com/admdh/adm-dev-kit-init-project/master/images/adm-dev-kit-auto-project-init.gif)
##### Manual:
![ADM DEV KIT INIT MANUALLY](https://raw.githubusercontent.com/admdh/adm-dev-kit-init-project/master/images/adm-dev-kit-manual-project-init.gif)


### Manual project setup
Install:
```js
npm i --save adm-dev-kit
```


Create server file:
```js
//server.js
const app = require('adm-dev-kit');

app.server({
    src: './src',       // working directory
    views: './views'    // express views folder
});
```
Create build file: 
```js
//gulpfile.js
const app = require('adm-dev-kit');

app.build({
    src: './src',       // working directory
    dest: './dest'      // build directory
});
```
