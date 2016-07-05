const express = require('express');
const server = express();
const path = require('path');
const fs = require('fs');
const myip = require('my-ip');
const open = require('open');

const serverIP = require('./_server/ip/server-ip');
const serverVIEWS = require('./_server/views/server-views');
const serverROUTES = require('./_server/routes/server-routes');
const serverHTML = require('./_server/middlewares/server-html');
const serverJS = require('./_server/middlewares/server-js');
const serverCSS = require('./_server/middlewares/server-css');
const serverIMG = require('./_server/middlewares/server-img');
const serverLISTEN = require('./_server/listen/server-listen');

const pjson = require('./package.json');

const src = '../../src';
const views = '../../views';
const host = pjson.host || 'adm-dev-kit';
const port = pjson.port || 3000;
const openURL = host;
const name = pjson.name;
const desc = pjson.description;
const version = pjson.version;

serverIP(server, port);
serverVIEWS(server, express, path, src, views);
serverHTML(server);
serverJS(server, fs, path, src);
serverCSS(server, path, src);
serverIMG(server, fs, path, src);
serverROUTES(server);
serverLISTEN(server, host, port, openURL, myip, open, name, desc, version);
