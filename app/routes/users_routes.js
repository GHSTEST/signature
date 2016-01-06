 var isLoggedInApp = require('../policies/sessionAuth')

// expose
module.exports = function(express, User) {
     
// =====================================
        // APP USERS SECTION =====================
        // =====================================   
        var appRoutes = express.Router();
    

        // route middleware to verify a token
        appRoutes.use(isLoggedInApp);
        
    // //http://www.javacodegeeks.com/2014/03/single-page-application-with-angular-js-node-js-and-mongodb-mongojs-module.html
// http://blog.modulus.io/nodejs-and-express-create-rest-api
    // http://blog.xebia.fr/2014/12/12/gerer-les-erreurs-avec-node-js/
    // http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/
    // regarder dans sail ou mean, pour recuperer les codes erreurs, voir code erreur pour pas d'utilisateur trouvé
       appRoutes.get('/users', function(req, res){
           User.findExcept(req.user, function(status, users){
               return res.json(users);
           });
        })

        // create user and send back all todos after creation
        appRoutes.post('/users', function(req, res){
            
                    // asynchronous
                // find a user whose name is the same as the forms name
                // we are checking to see if the user trying to login already exists
                User.findOne({'name' : req.body.name }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        res.send(err);

                    // check to see if theres already a user with that name
                    if (user) {
                        return req.flash('signupMessage', 'That name is already taken.');
                    } else {
                       User.create(req.body.name, req.body.password, false, function(){
                                  User.findExcept(req.user, function(status, users){
                               return res.json(users);
                           });
                        });
                    }
                });
          

        });

        // delete a user
        appRoutes.delete('/users/:user_id', function(req, res){
            console.log("delete REQUEST "+req.params.user_id)
            // on ne peut pas supprimer un admin sauf superadmin !
            User.remove({
                _id : req.params.user_id
            }, function(err, user) {
                if (err)
                    res.send(err);
                
                   User.findExcept(req.user, function(status, users){
                       console.log("delete.find");
                       return res.json(users);
                   });
            });
        });
    
    
        // ajouter un next pour tous pour renvoyer le find systematiquement, ou traiter les erreurs   
        return appRoutes;
};