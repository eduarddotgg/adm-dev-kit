# ADM DEV KIT (Gulp)
<img align="right" width="77" height="108" title="Dev Kit Main Logo" src="http://adm-designhouse.com/dev-kit-main-logo.png">
ADM DEV KIT (Gulp) - component driven static website starter kit (Jade/ PostCSS).  
Keep Your project modular. Make Your components independent.  

## Why?
There are cool tools like react and webpack. React and webpack are great tools for component driven development, they are best for SPA(single page application).  
But We still need to develop static websites. And the main problem is that it's really hard to handle dependencies.

### The Problem
While developing static website all HTML, JS and CSS dependencies are stored in different places and included into different files.
<img width="1024" height="600" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--non-modular-dependencies.png">    
So for example if You would like to delete some html fragment, You will have to delete it's JS and CSS somewhere else which can take some time until you find it and understand which part of JS or CSS exactly belongs to that html fragment. Sometimes we or our colleagues after deleting some html fragment forget to delete it's JS or CSS, so we have some not used JS and CSS which only generates file size sometimes make cause some errors.

### The Solution
As a solution to that i would like to offer component driven development for static websites.
<img align="right" width="1024" height="600" title="Dev Kit Main Logo" src="http://adm-designhouse.com/adm-dev-kit--modular-dependencies.png">  
Component driven development can make our dependencies handling much easier. You can keep all component's related JS and CSS dependencies in one place.

## Usage
Clone/fork or just download repositry and than just run: 
```
$ npm i
$ npm start
```
Open in Your browser
```
http://localhost:3000
```