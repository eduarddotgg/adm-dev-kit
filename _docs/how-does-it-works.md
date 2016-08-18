## Prject Structure
Basic project structure is:
```
src/ // source folder
    |- index/ // folder that contains index.pug's components
        | - hello-world/ // "Hello, World!" component
            | - hello-world.pug
            | - hello-world.js
            | - hello-world.css
    |- index.pug // Projects main section
```

Any project starts with source folder by default if is ```src```.
All pug files that are stored in the root of ```src``` folder are representing project's main separate pages like "Home Page", "About Page", "Contacts Page", etc.  

For better project organization every main page should have folder with it's name which will include all components related to that page.
If project components require common js or css files they can be stored in common folder, for example:
```
src/
    |- common
        |- some-common-lib
            |- some-common-lib.js
    |- index
    |- index.pug
```


## Include JS
JSPM is used as main JS bundler and package manager for third party libraries like angular or jquery.
JS include looks like this:
```
p.hello-world Hello, World!

script System.import('hello-world.js')
```
Important to know path in ```System.import``` should be relative to project's main page:
```
src/
    |- index
        |- hello-world
            |- hello-world.pug
            |- hello-world.js
    |- index.pug
    
index.pug:
...
include index/hello-world/hello-world.pug
...

hello-world.pug:
script System.import('index/hello-world/hello-world/hello-world.js')
```


## Include CSS
PostCSS is used as main pre and post processor for CSS.
CSS inculde looks like this:
```
link(href="hello-world.css" type="text/css" rel="stylesheet")
p.hello-world Hello, World!
```
Important to know path in ```href``` should be relative to project's main page:
```
src/
    |- index
        |- hello-world
            |- hello-world.pug
            |- hello-world.css
    |- index.pug
    
index.pug:
...
include index/hello-world/hello-world.pug
...

hello-world.pug:
link(href="index/hello-world/hello-world/hello-world.css" type="text/css" rel="stylesheet")
```

## HTML
## JS
## CSS