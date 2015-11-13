# ADM DEV KIT
<img align="right" width="77" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-main-logo.png">
ADM DEV KIT (Gulp) - component driven static website starter kit (Jade/ PostCSS).  
Build Your next Project with independent and isolated components.

## Problem.
While developing static website all HTML, JS and CSS dependencies are stored in different places and included into different files.
<img width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--non-modular-dependencies.png">    
So for example if You would like to delete some html fragment, You will have to delete it's JS and CSS somewhere else which can take some time until you find it and understand which part of JS or CSS exactly belongs to that html fragment. Sometimes we or our colleagues after deleting some html fragment forget to delete it's JS or CSS, so we have some not used JS and CSS which only generates file size sometimes make cause some errors.

## Solution.
As a solution to that i would like to offer component driven development for static websites.
<img align="right" width="1024" height="" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--modular-dependencies.png">  
Component driven development can make our dependencies handling much easier. You can keep all component's related JS and CSS dependencies in one place.

## What is inside?
- [Gulp](https://github.com/gulpjs/gulp) as task runner;
- [Express](https://github.com/strongloop/express) for serving static files;
- [Browser-Sync](https://github.com/BrowserSync/browser-sync) for sync browsing and browser refreshing;
- [Jade](https://github.com/jadejs/jade) as template language;
- [PostHTML BEM](https://github.com/rajdee/posthtml-bem) for BEM naming structure ;
- [PostCSS](https://github.com/postcss/postcss) as pre/postprocessor for CSS;
- Basic css style for default html tags.
- Custom built Qr-Code UI for easy opening on mobile devices; (Coming up)

## Usage
Clone/fork or just download repositry and install all node dependencies: 
```
$ npm i
```
Edit host name, port for Your own in package.json.
Than run:
```
$ npm run
```
Open in Your browser:
```
http://localhost:3000
```