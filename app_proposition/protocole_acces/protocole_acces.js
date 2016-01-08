var events = require('events');


function protocole_acces(){
}

protocole_acces.prototype = new events.EventEmitter;
protocole_acces.prototype.constructor = protocole_acces;

protocole_acces.prototype.log_utilisateur =  function(req, res){
	
}

protocole_acces.prototype.lire_la_demande(req, res){
	switch (req.type_utilisateur) {
		case "employeur":
				switch (req.demande) {
					case "ajouter_une_campagne":

						break;
					case "signer_une_campagne"
					default:

				}

			break;
		default:

	}

}

protocole_acces.prototype.effectuer_la_demande(){

}
