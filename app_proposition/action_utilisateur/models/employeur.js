var mongoose = require('mongoose');
var campainSchema = require('campain.js')

var employeurSchema = mongoose.Schema({
        nom : String,
		campagne_en_cours : [id_campain : String],
        compteur_signature : Number
});