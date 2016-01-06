// require
var mongoose = require('mongoose');

// define the schema for our campain model
var campainSchema = mongoose.Schema({
    
        email_dest   : String,
        token : String,
        name_dest : String,
        campainID : String,
        status : Integer,
        created_At : Date,
        modified : Date
        
    
});


// create the model for users and expose it to our app
module.exports = mongoose.model('campain', campainSchema);