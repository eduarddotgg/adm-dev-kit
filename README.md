<img title="Dev Kit" src="http://adm-designhouse.com/adm-dev-kit.png">  
# ADM DEV KIT 2.0 BETA
[![Join the chat at https://gitter.im/admdh/adm-dev-kit](https://badges.gitter.im/admdh/adm-dev-kit.svg)](https://gitter.im/admdh/adm-dev-kit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  
  
    
      
#### ADM DEV KIT - Component Driven Static Website Development Tool.

##### Built with:
- [Express](https://github.com/strongloop/express)
- [Gulp](https://github.com/gulpjs/gulp) 
- [Browser-Sync](https://github.com/BrowserSync/browser-sync) comming soon
- [Jade](https://github.com/jadejs/jade)
- [PostHTML](https://github.com/posthtml/posthtml)
- [PostCSS](https://github.com/postcss/postcss)
- Basic PostCSS plugins.
- [MY IP UI](https://github.com/admdh/my-ip-ui)
- Basic css style for default html tags;



## Idea.
Over the past few years front-end is developing rapidly. Component driven development became very popular. Component drive development helps to keep project well organized and easy maintainable. There are a lot of different JavaScript frameworks that are component driven and they (JS frameworks) hanlde components pretty well. But the problem is that we still need static websites without html and css inside of JavaScript bundle file. And actully there is still no good way/option to handle components outside of JavaScript. And the main idea of ADM DEV KIT is to  give ability to develop in component driven way outside of JavaScript.


## Problem.
While developing static website all HTML, JS and CSS dependencies are stored in different places and included into different files.
While developing website or even web app all JS and CSS dependencies often stored in separate folders like it is showed on the image below.
<img width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--non-modular-dependencies.png">    
Sometimes it's really hard to maintane components when they similar structure. It's really hard to keep logical and clean structure of component's JS and CSS in different places especially in big projects and teams.


## Solution.
As You can see on the image below all components and it's depependencies are grouped. Every single component and it's dependencies are stored in one place/folder. 
<img align="right" width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--modular-dependencies.png">  
.  



## Quick Start
Clone/fork or just download repository and install all node dependencies: 
```
$ npm i
```
Edit package.json:
```
{
	...
	"host": "adm-dev-kit",
	"port": 3000,
	...
}
```
Than run:
```
$ npm start
```
It will automaticly open default browser.
  
  
##  
More documentation is coming soon.