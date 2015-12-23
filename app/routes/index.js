var jwt = require('jsonwebtoken');// used to create, sign, and verify tokens
var isLoggedIn = require('../policies/sessionAuth');
var isTokenValidfunction = require('../policies/tokenAuth');
    
// expose
module.exports = function(app, passport, express, User) {
        
        var options = {
            root: __dirname + '/../../public/'/* ,
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }*/
          };
    
        // =====================================
        // HOME PAGE =====================
        // =====================================
        app.get('/', function(req, res){
            res.render('index.ejs');
        })

        
        // =====================================
        // LOGIN SECTION =====================
        // =====================================
        // show login
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage')});
        })
        
        // process login
        app.post('/login', passport.authenticate('local-login', {
             successRedirect : '/profile', // redirect to the secure profile section
             failureRedirect : '/login', // redirect back to the login page if there is an error
             failureFlash : true // allow flash messages
        }))
        
    
        // =====================================
        // PROFILE SECTION =====================
        // =====================================
        // we will want this protected so you have to be logged in to visit
        // we will use route middleware to verify this (the isLoggedIn function)
        app.get('/profile', isLoggedIn, function(req, res) {
            var message = "";
            var users = User.find({}, function(err, users) {
                res.render('profile.ejs', {
                    user : req.user, // get the user out of session and pass to template
                    users : users,
                    message : message
                });
            });
        });

        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', isLoggedIn, function(req, res) {
            req.logout();
            res.redirect('/');
        });
    
   
        // =====================================
        // API USERS SECTION =====================
        // =====================================   
        var apiRoutes = express.Router();
    
        // sample api route
    
        apiRoutes.post('/authenticate', function(req, res) {
            
            // find the user
            User.findOne({
                name: req.body.name
            }, function(err, user) {
                if(err) throw err;
                if(!user) {
                    res.json({ success:false, message: 'Authentication failed. User not found.'});
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, app.get('superSecret'), {
                      expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: token
                    });
                    
                }
            });
            
        });

        // route middleware to verify a token
        apiRoutes.use(isTokenValidfunction(app));
        
        apiRoutes.get('/', function(req, res) {
            res.json({ message: 'Welcome to the coolest API on earth!'});
        });
    
        
        app.use('/api', apiRoutes);
           
    
        appRoutes = require('./users_routes')(express, User);
        app.use('/app', appRoutes);
        
    
        // =====================================
        // SCRAPE SECTION =====================
        // =====================================  
        app.get('/scrape', isLoggedIn, function(req, res) {
            
          require('../tools/scrape')();
              
          // send out a message to the browser reminding you that this app does not have a UI.
          res.send('Check your console!')     
        });
    
        // =====================================
        // DEFAULT PAGE =====================
        // =====================================
        app.get('*', isLoggedIn, function(req, res) {
            res.sendFile('404.html', options);
        });
        

};
