// require
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our client model
var clientSchema = mongoose.Schema({
    
        email   : String,
        password : String,
        name : String,
        clientID : String
        
    
});

// methods
// generating a hash
clientSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
clientSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Client', clientSchema);


