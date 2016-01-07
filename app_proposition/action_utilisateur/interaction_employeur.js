var emplacements = require('noms_globaux')
var mongoose = require('mongoose');

 if (require.main === module){
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '^^ connection error:'));
db.once('open', function() {
	console.log("debut")
  // we're connected!
});
}

var Employeur = require(emplacements.employeur);
var Campagne = require(emplacements.campain)
var certiclic = require(emplacements.certiclic)
var certisms = require(emplacements.certisms)


Employeur.prototype.obtenir_sms = function(){
	var sms = new certisms.Service_certisms(textOk, this);
	_this = this
	sms.on('succes', function(){
		_this.autorisation.valider_code_sms = Date.now();
		_this.save();
	} );
	sms.envoyer_demande_soap("addAccess");
}

Employeur.prototype.valider_code = function(code){
	this.code = code;// a voir quand sms fonctionne
	var sms = new certisms.Service_certisms(textOk, this);
	sms.on('succes', function(){
		_this.autorisation.ajouter_une_campagne = Date.now();
		_this.save();
	})
	sms.envoyer_demande_soap("checkAccess");
}

Employeur.prototype.ajouter_une_campagne = function(doc, signataire){
		var id_campagne = Campagne.obtenir_dernier_id(); //pas tres beau...
		_this = this;
		Campagne.create({campainID: id_campagne, nom: 'Max', prenom: 'toto', contrat : doc}, function(err, nouvelle_campagne){
			_this.campagnes_en_cours.push(id_campagne);
			_this.compteur +=1;
			_this.save(function(err){})
			})
}


Employeur.prototype.faire_signer = function(une_signature, doc_a_signer){
	var embaucheur = new certiserveur.Embaucheur(this.idClientCerteurope);
	var certiserveur = new certiserveur.Service_certiserveur(embaucheur, doc_a_signer, une_signature);
	certiserveur.on('succes', function(){
		//ici, ce qu'il advient du modele une fois signature bi partie faite...
	})
	certiserveur.envoyer_la_demande();
}
