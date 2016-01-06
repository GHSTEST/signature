// require
var mongoose = require('mongoose');
var emplacements = require('noms_globaux.js')
var Log = require(emplacements.log)

var autorisationSchema = mongoose.Schema({


})
// define the schema for our campain model
var campainSchema = mongoose.Schema({
	  campainID : {type : Number, index : true},
    nom : {type : String, required : true},
		prenom : String,
		mail   : {type : String, required : true},
		tel : {type : String, required : true},
    token : String,
		autorisation : {
						valider_code_sms : {type : Date, default : new Date(1901,01,01)},
						signer_la_campagne : {type : Date, default : new Date(1901,01,01)}
			},
		signe_par : {
						employeur : {type : Boolean, default : false},
						salarie : 	{type : Boolean, default : false}
		}
    created_At : {type : Date, default: Date.now},
    modified : {type : Date, default: Date.now},
		contrat : Buffer
});


campainSchema.statics.obtenir_dernier_id = function(){
	if (typeof(this.max_id) == "number"){
		this.max_id +=1;
		max_id = this.max_id;
		Log.update({variable : 'max_idCampain'},{$set : { valeur : max_id }}).exec();
		}
	else {
		Log.create({variable : 'max_idCampain', value : 0, automate : true})
		this.max_id = 0;}
	return this.max_id;
}

campainSchema.statics.retablir_dernier_id = function(){
	Log.findOne({variable : 'max_idCampain'})

}



// create the model for users and expose it to our app
module.exports = mongoose.model('campain', campainSchema);
