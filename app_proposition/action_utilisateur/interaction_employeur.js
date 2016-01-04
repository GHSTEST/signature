var emplacements = require('noms_globaux')
var mongoose = require('mongoose');
var employeur = require(emplacements.employeur);
var campagne = require(emplacements.campain)
var certiclic = require(emplacements.certiclic)
var certisms = require(emplacements.certisms)


function employeur(){
}

employeur.prototype.qui_suis_je = function(JSON_demande){
	this.moi = employeur.findOne(JSON_demande);
}

employeur.prototype.obtenir_sms = function(){
	var sms = new service_certisms(textOk, this.moi);
	var reponse = sms.envoyer_demande_soap(emplacements.addAccess);
	return reponse
}

employeur.prototype.valider_code = function(code){
	this.code = code;
	var sms = new certisms.service_certisms(textOk, this.moi);
	sms.envoyer_demande_soap(emplacements.checkAccess);
}

employeur.prototype.ajouter_doc_a_signer = function(doc, signataire){
		var une_campagne = new une_campagne();
}
employeur.prototype.faire_signer = function(une_signature, doc_a_signer){
	var on_veut_signer = 1;
	var clic = new certiclic.service_certiclic(on_veut_signer, this.moi.id, this.moi, une_signature, doc_a_signer);
	clic.envoyer_la_demande();
	
}
