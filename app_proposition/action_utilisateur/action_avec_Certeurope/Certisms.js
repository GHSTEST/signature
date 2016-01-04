var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var crypt = require('crypto');
var FormData = require('form-data');
var emplacements = require('noms_globaux');
var parametres = require('parametres')

function signataire(nom, prenom, tel){
	this.nom = nom;
	this.prenom = prenom;
	this.tel = tel;
}

function service_certisms(textOk,  un_signataire){
	this.code_appli = parametres.code_appli; //code propre a GHS pour acceder au service certisms
	this.textOk = textOk; //?? texte affichee lors de l'envoi du sms ??
	this.signataire = un_signataire;	//donnees du signataire
}


service_certisms.prototype.ecrire_requete_soap = function(quelle_requete){
	var xml_a_interpreter = fs.readFileSync(quelle_requete, 'utf8') 
	var xml = ejs.render(xml_a_interpreter, {'param': this});
	return xml
}

service_certisms.prototype.envoyer_demande_soap = function(quelle_requete){
	var requete_soap = this.ecrire_requete_soap(quelle_requete);
	var options_http = {
		hostname: 'certisms.certeurope.fr',
		path : '/CertiSMS.php',
		port: 80,
		method: 'POST',
		headers: {
			'Content-Type': 'application/soap+xml',
			'Content-Length': requete_soap.length,
			'charset': 'UTF-8'
				}
		}; 
	var _this = this;
	var req = http.request(options_http, this.masque_recevoir_la_reponse(_this));
	req.write(requete_soap);
	req.end();
}

emplacements.ajouter_fichier_local('addAccess',__dirname, 'requete_soap_addAccess.ejs');
emplacements.ajouter_fichier_local('checkAccess',__dirname, 'requete_soap_checkAccess.ejs');

service_certisms.prototype.masque_recevoir_la_reponse = function(_this){
	var recevoir_la_reponse = function(res){
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		var reponse = "";
		res.on('data', function(chunck){ reponse += chunck;})
		res.on('end', function(){_this.gestion_des_reponses(reponse);});
	}
	return recevoir_la_reponse
}

service_certisms.prototype.gestion_des_reponses = function(reponse){
	console.log(reponse);
	var corps_rep = reponse.substr(reponse.indexOf("SOAP-ENV:Body"));
	var quelle_requete = corps_rep.substring((corps_rep.indexOf("<ns1")+5), corps_rep.indexOf("Response"));
	var quelle_erreur = corps_rep.substring((corps_rep.indexOf("<error>")+7), corps_rep.indexOf("</error>"));
	var message_erreur = corps_rep.substring((corps_rep.indexOf("<errormsg>")+10), corps_rep.indexOf("</errormsg>"));
	console.log(quelle_requete);	
	console.log(quelle_erreur);
	console.log(message_erreur);
}

var p1 = new signataire('nom', 'prenom', '0177777777');
var a = new service_certisms('salut', p1);
console.log("===....====")
console.log(emplacements.addAccess)
a.envoyer_demande_soap(emplacements.addAccess);

module.exports.service_certisms = service_certisms;
