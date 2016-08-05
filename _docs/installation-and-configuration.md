# Instalation
For quicker start [ADM DEV KIT INIT PROJECT]() is recommended. It will initialize project and generate all necessary files.  

## Installing ADM DEV KIT INIT PROJECT
installing globaly:
```
$ npm i -g adm-dev-kit-init-project
```

## Init Project with ADM DEV KIT INIT PROJECT
After it is installed navigate to project's folder and run ```adm``` command in terminal:
```
$ cd new-project
$ adm
```
There are two options to init project - automatically and manual.
```
? Init project automatically: (Y/n) 
```

After project has been initialized dependencies shoud be installed:
```
$ npm i
$ jspm i
```

## Init project without ADM DEV KIT INIT PROJECT
ADM DEV KIT requires some default files to run. If you would like to init project manually, without ADM DEV KIT INIT PROJECT, follow default file structure. 

Project default structure
```
[src]           // Is used to keep projects HTML(Pug), JS, CSS(PostCSS) 
[views]         // Express views folder
.editorconfig   // Basic editor configuration
.eslintrc       // JavaScript linter config file
.stylelintrc    // CSS linter config file
gulpfile.js     // Gulpfile taht includes all neccessary task to build project for production
package.json    // Pacakge.json includes most common project information with some additions
server.js       // Server settings 
```

#### package.json
Default structure of package.json is:
```json
{
  "name": "adm-dev-kit",
  "version": "1.0.0",
  "description": "",
  "author": "",
  "repository": "",
  "license": "MIT",
  "main": "server.js",
  "scripts": {
    "run": "node server.js",
    "build": "gulp",
    "lint": "gulp lint"
  },
  "precommit": "lint",
  "srcFolder": "./src",
  "viewsFolder": "./views",
  "buildFolder": "./dest",
  "host": "localhost",
  "port": "3000",
  "cssVariables": "./src/_css-variables.css",
  "eslint": "eslint-config-adm-dev-kit",
  "stylelint": "stylelint-config-adm-dev-kit",
  "dependencies": {
    "adm-dev-kit": "^2.5.4"
  },
  "jspm": {
    "directories": {
      "baseURL": "src",
      "packages": "src/__jspm_packages"
    },
    "configFile": "src/_jspm-config.js",
    "dependencies": {},
    "devDependencies": {
      "babel": "npm:babel-core@^5.8.24",
      "babel-runtime": "npm:babel-runtime@^5.8.24",
      "core-js": "npm:core-js@^1.1.4"
    }
  }
}
```
package.json has some additional information that is required in ```server.js``` and ```gulpfile.js```.

#### server.js
Default server.js:
```js
var app = require('adm-dev-kit');
var pjson = require('./package.json');

app.server({
	src: pjson.srcFolder,
	views: pjson.viewsFolder,
	host: pjson.host,
	port: pjson.port,
	openURL: pjson.host,
	name: pjson.name,
	desc: pjson.description,
	version: pjson.version,
	cssVariables: pjson.cssVariables
});
```

#### gulpfile.js
Default gulpfile.js:
```js
var app = require('adm-dev-kit');
var pjson = require('./package.json');

app.build({
	src: pjson.srcFolder,
	dest: pjson.buildFolder
});
```
