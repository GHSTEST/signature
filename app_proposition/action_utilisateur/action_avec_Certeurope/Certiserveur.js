var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var crypt = require('crypto');
var events = require('events');
var xml2js = require('xml2js');
var FormData = require('form-data');
var emplacements = require('noms_globaux');
var parametres = require(emplacements.parametres);


function Embaucheur(idClientCerteurope){
  this.idClientCerteurope = idClientCerteurope
}

function Signature(page,type_image, x_coin_bas_gauche, y_coin_bas_gauche, x_coin_haut_droit, y_coin_haut_droit ){
	this.page = page;
	this.type_image = type_image; //0==image certeurope; 1== image ghs; 2 == image utilisateur
	this.x_coin_bas_gauche = x_coin_bas_gauche;
	this.y_coin_bas_gauche = y_coin_bas_gauche;
	this.x_coin_haut_droit = x_coin_haut_droit;
	this.y_coin_haut_droit = y_coin_haut_droit;
}

function Doc(fichier_pdf){
	this.fichier_pdf = fichier_pdf // en local
}

Doc.prototype.hashage = function(){
	var cryptage_en_sha1 = crypt.createHash('sha1');
	cryptage_en_sha1.update(this.fichier_pdf);
	var hash_du_doc = cryptage_en_sha1.digest('hex');
	/*fichier.on('data', function(data){
		cryptage_en_sha1.update(data);
	});
	fichier.on('end', function(){
		var hash_du_doc = cryptage_en_sha1.digest('hex');
		console.log(hash_du_doc)
	});*/
	this.hash = hash_du_doc;
	this.algo = 'SHA1';
}

  emplacements.ajouter_fichier_local('employeur_pdfSign',__dirname, 'requete_soap_pdfSignRequest.ejs');


function Service_certiserveur(un_embaucheur, un_doc, une_signature){
  this.embaucheur = un_embaucheur;
  this.doc = un_doc;
  this.doc.hashage();
  this.signature = une_signature;
}

Service_certiserveur.prototype = new events.EventEmitter();
Service_certiserveur.prototype.xml_a_interpreter = fs.readFileSync(emplacements.employeur_pdfSign, 'utf8');


Service_certiserveur.prototype.ecrire_requete_soap = function(){
	var xml = ejs.render(this.xml_a_interpreter, {'param': this});
	return xml
}


Service_certiserveur.prototype.envoyer_demande_soap = function(){
	var requete_soap = this.ecrire_requete_soap();
	var options_http = {
		hostname: 'signature.certeurope.fr',
		path : '/ws/services/WSFacade',
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
  req.on('connect', function(){console.log('ici-----')})
  req.on('error', function(err){console.log('une erreur est survenue')})
	this.emit('envoye')
}

Service_certiserveur.prototype.masque_recevoir_la_reponse = function(_this){
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

Service_certiserveur.prototype.gestion_des_reponses = function(reponse){
	console.log(reponse);
  var xml_reponse = xml2js.parseString(reponse, { explicitArray : false }, function(err, result){console.log(result)});
	var corps_rep = reponse.substr(reponse.indexOf("SOAP-ENV:Body"));
	var quelle_requete = corps_rep.substring((corps_rep.indexOf("<ns1")+5), corps_rep.indexOf("Response"));
	var quelle_erreur = corps_rep.substring((corps_rep.indexOf("<error>")+7), corps_rep.indexOf("</error>"));
	var message_erreur = corps_rep.substring((corps_rep.indexOf("<errormsg>")+10), corps_rep.indexOf("</errormsg>"));
	console.log(quelle_requete);
	console.log(quelle_erreur);
	console.log(message_erreur);
	if (message_erreur == "OK"){
		this.emit('succes');
	}
	else{ this.emit('pb');}
	this.emit('traitement_termine', quelle_requete, quelle_erreur, message_erreur)
}

if (require.main === module){
var e1 = new Embaucheur('test');
var s1 = new Signature('1','0', '10','10', '190','50');
var f1 = fs.readFileSync(__dirname+'/FNTC_guide+signature+elec_.pdf');
var d1 = new Doc(f1);
var a = new Service_certiserveur(e1,d1,s1);
a.envoyer_demande_soap(emplacements.addAccess);
}

module.exports.Embaucheur = Embaucheur;
module.exports.Signature = Signature;
module.exports.Doc = Doc;
module.exports.Service_certiserveur = Service_certiserveur;
