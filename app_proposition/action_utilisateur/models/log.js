// require
var mongoose = require('mongoose');

// define the schema for our campain model
var logSchema = mongoose.Schema({
		variable : String,
		valeur : Number,
		action : String, 
		employeur : employeurSchema,
		campagne : campainSchema,
		admisnistrateur : String,
		automate : Boolean,
        created_At : {type : Date, default: Date.now}
});


module.exports = mongoose.models('log', logSchema);