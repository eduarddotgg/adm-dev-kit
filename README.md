<img title="Dev Kit" src="http://adm-designhouse.com/adm-dev-kit-logo.svg">  
# ADM DEV KIT 2.0
[![Join the chat at https://gitter.im/admdh/adm-dev-kit](https://badges.gitter.im/admdh/adm-dev-kit.svg)](https://gitter.im/admdh/adm-dev-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  

#### What is ADM DEV KIT?
ADM DEV KIT is component driven static websited development tool. It is built with Node.js, Express.js, Gulp.js, Pug.js, PostHTML, PostCSS and other smaller tools. ADM DEV KIT include preconfigured development environment and build tasks to make development and deployment easier. 

#### Features
- Component driven development with independent components;
- Development and build environment;
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
- Introduction (coming soon)
- Installation (coming soon)
- Configuration (coming soon)
- Getting started (coming soon)
- Examples (coming soon)

## Quick start
Install:
```js
npm i --save adm-dev-kit
```
Server:
```js
//server.js
const app = require('adm-dev-kit');

app.server({
    src: './src',       // working directory
    views: './views'    // express views folder
});
```
Build: 
```js
//gulpfile.js
const app = require('adm-dev-kit');

app.build({
    src: './src',       // working directory
    dest: './dest'      // build directory
});
```

