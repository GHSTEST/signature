// require
var mongoose = require('mongoose');

// define the schema for our campain model
var campainSchema = mongoose.Schema({
	    campainID : {type : String, index : true},
        nom : String,
		prenom : String,
		mail   : String,
		tel : String,
        token : String,
        status_campain : {type: Number, default: 0},
        created_At : {type : Date, default: Date.now},
        modified : {type : Date, default: Date.now},
		contrat : Buffer
});

campainSchema.statics.obtenir_dernier_id(){
	if (typeof(this.max_id) == "number"){
		this.max_id +=1;
		}
	else {
		this.max_id = 0;}
	return this.max_id;
}

// create the model for users and expose it to our app
module.exports = mongoose.model('campain', campainSchema);