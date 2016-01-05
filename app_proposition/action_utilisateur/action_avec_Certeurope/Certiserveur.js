var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var crypt = require('crypto');
var events = require('events');
var FormData = require('form-data');
var emplacements = require('noms_globaux');
var parametres = require(emplacements.parametres);

function Service_certiserveur(){
}

Service_certiserveur.prototype = new events.EventEmitter();

