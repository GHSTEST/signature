var emplacements = require('noms_globaux.js');
var events = require('events');

function Reponse_ecouteur(res){
  this.communication_client = res;
}

Reponse_ecouteur.prototype = new events.EventEmitter();

Reponse_ecouteur.prototype.ajouter = function(obj){
  switch(obj.constructor){
    case Employeur :
      obj.on('succes', function(param){ 
                } )
      break;
  }
}
