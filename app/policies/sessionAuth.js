
module.exports = function(req, res, next) {

    // route middleware to make sure a user is logged in (for app)
   
        console.log('is logged in '+req.isAuthenticated());

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');

          // User is not allowed
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      //return res.forbidden('You are not permitted to perform this action.');
};