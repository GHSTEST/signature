// require
var mongoose = require('mongoose');
var emplacements = require('noms_globaux');

// define the schema for our campain model
var logSchema = mongoose.Schema({
		variable : String,
		valeur : Number,
		action : String,
		employeur : String,
		campagne : String,
		admisnistrateur : String,
		automate : Boolean,
        created_At : {type : Date, default: Date.now}
});


module.exports = mongoose.model('log', logSchema);
