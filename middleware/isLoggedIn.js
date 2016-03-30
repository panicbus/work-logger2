var isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    console.log('Unauthorized. User is not logged in...')
    req.flash("error", "You must log-in to perform that action.");
    res.redirect('/login');
};


module.exports = isLoggedIn;