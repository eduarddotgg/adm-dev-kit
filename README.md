<img title="Dev Kit" src="http://adm-designhouse.com/adm-dev-kit-logo.svg">  
# ADM DEV KIT 2.5.0
Today component driven development is getting more and more popular. Components help us to make our projects more structurized, easy to maintain and much more.
There are a lot of methodologies and frameworks that help to structurize projects in component way.

ADM DEV KIT is set of tools and plugins that give you ability to develop in component driven way. 
ADM DEV KIT provides development and build environment as well.


## Documentation
- [Introduction](https://github.com/admdh/adm-dev-kit/blob/2.5.0/_docs/introduction.md)
- How Does It Work? (coming soon)
- Installation and Configuration (coming soon)
- Getting started (coming soon)
- Examples (coming soon)


## Features
- Component driven development with independent components;
- Development and build environment;
- Project Init Tool [ADM DEV KIT INIT PROJECT](https://github.com/admdh/adm-dev-kit-init-project) - initialise project with ease;
- PostHtml;
- PostCSS - use future css today;
- JSPM - install third party libraries, bundle JS;
- EsLint - check your JS code;
- StyleLint - check you CSS code;
- Pre-commit;
- Default CSS;
- MY-IP-UI - helps to open project on other devices;
- and much more 


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