![Triple Verge](build/img/share-image.png)

> The Triple Verge Website

---


Get started
-----------

First of all, you need have installed [Node.js](http://nodejs.org/) and [Gulp](http://gulpjs.com) globally.
Then you can:

- Clone the repo: `git clone git@github.com:triple-verge/hotsite.git`
- Enter the folder: `cd hotsite`
- Install Node dependencies: `npm install`
- Finally install Bower components: `bower install`


Running
-------

You can run the app locally by [Gulp](http://gulpjs.com)

### Available Gulp commands

#### Default - `gulp`

Run `gulp` to compile and watch Jade, Stylus, JavaScript and optimize images running on [localhost:3000](http://localhost:3000)


#### Build - `gulp build`

Run `gulp build` to only compile Jade, Stylus, JavaScript and optimize images  files


#### Dist - `gulp dist`

Run `gulp build` to compile and minify Jade, Stylus, JavaScript and optimize images


Structure
---------

When you have all installed, the structure will look something like this:

```
node_modules/
src/
├── css/
│   ├── components/
│   │   └── *.styl
│   ├── core/
│   │   └── *.styl
│   ├── equalizr.styl
│   └── style.styl
├── html/
│   ├── incs/
│   │   └── *.jade
│   ├── layouts/
│   │   └── *.jade
│   └── index.jade
├── img/
│   ├── backgrounds/
│   │   └── *.{jpg|png|svg}
│   ├── favicons/
│   │   └── *.{png}
│   ├── icons/
│   │   └── *.{jpg|png|svg}
│   └── *.{jpg|png|svg}
├── js/
│   ├── modules/
│   │   └── *.js
│   └── app.js
├── .htaccess
├── browserconfig.xml
├── favicon.ico
├── humans.txt
└── manifest.json
.editorconfig
.gitattributes
.gitignore
.jshintrc
content.json
gulpfile.js
package.json
README.md
```


License
-------

© 2015 [Triple Verge](http://tripleverge.com)

[MIT License](http://acaua.mit-license.org/)
