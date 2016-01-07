var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var crypt = require('crypto');
var mongodb = require('mongoose');
var emplacements = require('noms_globaux');
var FormData = require('form-data');
var events = require('events');
var parametres = require(emplacements.parametres)

function Signataire(nom, prenom, mail){
	this.nom = nom;
	this.prenom = prenom;
	this.mail = mail;
}

function Signature(page,type_image, x_coin_bas_gauche, y_coin_bas_gauche, x_coin_haut_droit, y_coin_haut_droit ){
	this.page = page;
	this.type_image = type_image; //0==image certeurope; 1== image ghs; 2 == image utilisateur
	this.x_coin_bas_gauche = x_coin_bas_gauche;
	this.y_coin_bas_gauche = y_coin_bas_gauche;
	this.x_coin_haut_droit = x_coin_haut_droit;
	this.y_coin_haut_droit = y_coin_haut_droit;
}

function Doc(nom_du_doc, fichier_pdf){
	this.a_signer = '1' ;//1== signer le doc; 0 == ne pas signer
	this.type_sign = '0'; //une seule valeur possible
	this.nom_du_doc = nom_du_doc;
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

function Service_certiclic(type, id_requete, un_signataire,  une_signature, un_doc){
	this.type = type;//1 == signer ; 2 == signer et archiver ; 3,4 == normalement, on s'en sert pas
	this.code_appli = parametres.code_appli; //code propre a GHS pour acceder au service certclic
	this.id_requete = id_requete; // code unique de la requete
	this.signataire = un_signataire; //donnees du signataire
	this.signature = une_signature;// parametres de signature
	this.doc = un_doc; //parametres du doc a signer...
	this.doc.hashage();//...hashage du doc
}

Service_certiclic.prototype = new  events.EventEmitter();
Service_certiclic.prototype.xml_a_interpreter = fs.readFileSync(__dirname + '/requete_xml.ejs', 'utf8'); //patron de la requete xml

Service_certiclic.prototype.ecrire_xml = function(){
	var xml = ejs.render(this.xml_a_interpreter, {'param': this});
	return xml
}

Service_certiclic.prototype.envoyer_la_demande = function(){
	var formulaire = new FormData();
	formulaire.append('fichier', fs.createReadStream(this.doc.nom_du_doc));
	formulaire.append('xmlReq', this.ecrire_xml());
	var _this = this;
	formulaire.submit('https://cs1-qualif.certeurope.fr/SignatureCOC.do', this.masque_recevoir_la_reponse(_this)) ;
	this.emit('envoye');
}

Service_certiclic.prototype.masque_recevoir_la_reponse = function(_this){
	var recevoir_la_reponse = function(err, res){
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		if (res.headers['content-type'] == 'application/xml'){
			var fichier_signe = fs.createWriteStream("test_erreur.txt");
			res.pipe(fichier_signe);
			this.emit('pbme')
			}
		else { if (res.headers['content-type'] == 'application/octet-stream'){
			var fichier_signe = fs.createWriteStream("test.pdf");
			res.pipe(fichier_signe);
			this.emit('succes');
				}
			}
		res.on('end', function() {
			console.log("traitement termine");
			this.emit('traitement_termine');
			})
	}
	return recevoir_la_reponse
}

if (require.main === module){
var p1 = new Signataire('nom', 'prenom', 'nom.prenom@domaine.fr');
var s1 = new Signature('1','0', '10','10', '190','50')
var d1 = new Doc(__dirname+'/FNTC_guide+signature+elec_.pdf')
d1.hashage();
var a = new Service_Certiclic('1','34',p1, s1, d1);
a.envoyer_la_demande();
}

module.exports.Doc = Doc;
module.exports.Signature = Signature;
module.exports.Signataire = Signataire;
module.exports.Service_certiclic = Service_certiclic;
