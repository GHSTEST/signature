var mongoose = require('mongoose');

var employeurSchema = mongoose.Schema({
    nom : String,
    idClientCerteurope : String,
		campagnes_en_cours : [Number],
		autorisation : {
							valider_code_sms : {type : Date, default : new Date(1901,01,01)},
							ajouter_une_campagne : {type : Date, default : new Date(1901,01,01)}
						},
    compteur_signature : Number
});

module.exports = mongoose.model('employeur', employeurSchema);
