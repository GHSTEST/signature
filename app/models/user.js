

// create the model for users and expose it to our app
// require
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    
        email   : String,
        password : String,
        name : String,
        admin: Boolean
    
});

// methods
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// initialization
userSchema.statics.init = function(){
    var User = this;
    
   User.count({}, function(err, count) {
       if (err)
           throw err;
        if(count === 0) {
         User.create("admin", "ghsghs", true, function(){});
        }
   });
}

userSchema.statics.create = function(name, password, admin, done){
      // if there is no user with that email
        // create the user
        var newUser = new this();

        // set the user's local credentials
        newUser.name = name;
        newUser.password = newUser.generateHash(password);
        newUser.admin = admin;

        // save the user
        newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
        });
}

userSchema.statics.findExcept = function(user, done){
            var User = this;
    
            var req = {'_id':{'$ne':user._id}};
           
    
            if(user.admin === false){ // if not admin we can't load admin users
                req.admin = 'false';
                console.log('not admin' + req);
            }
    
                // use mongoose to get all users in the database
               User.find(req, function(err, users){
    
                // if there is an error retrieving, send the error.
                if(err)
                    throw err;
                
               return done(null, users);
              // return users; // pas correct à corriger

               // res.json(users); // return Users in JSON Format
                 // voir pour pas tout envoyer de l'utilisateur soit dans users soit en mettant le code suivant
                //res.writeHead(200, {'Content-Type': 'application/json'}); // Sending data via json
                 //  str='[';
                 //  users.forEach( function(user) {
                 //      str = str + '{ "name" : "' + user.username + '"},' +'\n';
                 //  });
                 //  str = str.trim();
                 //  str = str.substring(0,str.length-1);
                 //  str = str + ']';
                 //  res.end( str);
            });
    
}

// create the model for users and expose it to our app

module.exports = mongoose.model('User', userSchema);