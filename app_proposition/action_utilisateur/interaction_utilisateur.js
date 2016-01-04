var mongoose = require('mongoose');
var campagne = require('./models/campain.js')
var emplacements = require('noms_globaux')
var certiclic = require('./action_avec_Certeurope/certiclic.js')
var certisms = require('./action_avec_Certeurope/certisms.js')


function utilisateur(){
}

utilisateur.prototype.qui_suis_je = function(JSON_demande){
	this.moi = campagne.findOne(JSON_demande);
}

utilisateur.prototype.obtenir_sms = function(){
	var sms = new service_certisms(textOk, this.moi);
	console.log("je suis la")
	var reponse = sms.envoyer_demande_soap(emplacements.addAccess);
	return reponse
}

utilisateur.prototype.valider_code = function(code){
	this.code = code;
	var sms = new certisms.service_certisms(textOk, this.moi);
	sms.envoyer_demande_soap(emplacements.checkAccess);
}

utilisateur.prototype.faire_signer = function(une_signature, doc_a_signer){
	var on_veut_signer = 1;
	var clic = new certiclic.service_certiclic(on_veut_signer, this.moi.id, this.moi, une_signature, doc_a_signer);
	clic.envoyer_la_demande();
	
}

var u1 = new utilisateur();
u1.obtenir_sms