<h1 align="center">
Just Lite Web Application Template
</h1>
<h3 align="center">
v0.1.0
</h3>
<p align="center">
<img src="https://raw.githubusercontent.com/jesselloyd/just-lite-webapp-template/master/client/img/favicon.png" alt="J L"/>
</p>
<p align="center">Configured by jesselloyd</p>

---

Use this template as a lightweight starting point for any web application and tweak it according to your needs.

### Quick Start Guide

If you just want to get up and running, clone this repistory and run the following commands:


```
npm install
npm start
```

*Note:* Don't forget to make your own changes to the config.js file. That means making your own secret key and protecting it via some encryption method, and using your own connection string if you intend to use a database.

The server is configured with the following CLI commands on start, which explains all of its actions:

```
supervisor --quiet -w api,data,middleware,push,server.js,gulpfile.js,jsdoc.conf.json,
config.js,karma.conf.js server.js & gulp watch
& node-sass --watch client/css/style.scss client/css/style.css
```

If you write JSDocs, generate them from your JavaScript files using the jsdoc custom run script (You can configure your JSDocs to your liking in the jsdoc.conf.json file):

```
npm run jsdoc
```

### Pre Configured Features

* Gulp Build Automation
* Source Minification
* Minified Files Source Mapping (For better Devtools debugging)
* Source Bundling
* SCSS Preprocessor
* Brower Sync File Tree Watch
* JSDOC Integration
* Secure JSON Web Token Authentication
* Express Router Configured for SPA (Single Page Application)
* MongoDB Centric Data Model
* AngularJS Client Template
* Socket IO Bi-Directional Server-Client Communication

### Features To Come (Shortly)

* Karma/Jasmine Test Integration
* Mocha Test Integration

The general workflow that you can benefit from by using this template is as follows:

1. Whilst developing, set the "environment" key value to "development" in config.js

2. Start server with npm start - browser will automatically serve synced server

3. Develop! The server is automatically restarted when you edit server files (don't worry, this won't refresh the browser every time! It is seamless), and client HTML, SCSS and JS file changes automatically refresh the browser as well.
SCSS changes inject the appropriate minified CSS into the browser, so you won't get an annoying page refreshes every time you make style changes!

I hope that you will enjoy using this template. It is designed for rapid web application development using modern build tools and is lightning fast with its minification and is also configured to us gzip compression via Express' router for an extra performance boost.

So, what are you waiting for? Go and develop something great.

Jesse
