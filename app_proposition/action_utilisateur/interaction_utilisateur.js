var mongoose = require('mongoose');
var Campagne = require('./models/campain.js')
var emplacements = require('noms_globaux')
var events = require('events')
var certiclic = require('./action_avec_Certeurope/certiclic.js')
var certisms = require('./action_avec_Certeurope/certisms.js')

/*
utilisateur.prototype.qui_suis_je = function(JSON_demande){
	this.moi = campagne.findOne(JSON_demande);
}*/

Campagne.prototype.obtenir_sms = function(){
	var le_signataire = new certiclic.Signataire(this.nom, this.prenom, this.tel);
	var sms = new certisms.Service_certisms(textOk, le_signataire);
	_this = this
	sms.on('succes', function(){
		_this.autorisation.valider_code_sms = Date.now();
		_this.save();
	})
	sms.envoyer_demande_soap("addAccess");
}

Campagne.prototype.valider_code = function(code){
	var le_signataire = new certiclic.Signataire(this.nom, this.prenom, this.tel);
	var sms = new certisms.service_certisms(textOk, this.moi, code);
	sms.on('succes', function(){
		_this.autorisation.signer_la_campagne = Date.now();
		_this.save();
	})
	sms.envoyer_demande_soap("checkAccess");
}

Campagne.prototype.faire_signer = function(une_signature){
	var le_doc_a_signer = new certiclic.Doc(this.nom_contrat, this.contrat);
	var le_signataire = new certiclic.Signataire(this.nom, this.prenom, this.mail);
	var on_veut_signer = 1;
	var clic = new certiclic.Service_certiclic(on_veut_signer, this.idCampain, le_signataire, une_signature, le_doc_a_signer);
	clic.on('succes', function(){
	})
	clic.envoyer_la_demande();
}
 if (require.main === module){
var c1 = new Campagne();
var clic = new certisms.Service_certisms();
console.log((c1 instanceof events.EventEmitter))
console.log((c1.constructor ===  Campagne))
console.log(Object.prototype.toString.call(c1))

console.log((clic instanceof events.EventEmitter))
console.log((clic instanceof certisms.Service_certisms))
console.log((clic.constructor))
console.log(Object.prototype.toString.call(clic))
}
