var isLoggedIn = function (req, res, next){
	console.log('isLoggedIn req.user: ' + req.user);
	console.log('isLoggedIn req.isAuthenticated: ' + req.isAuthenticated());
    if(req.isAuthenticated()){
    		console.log('isLoggedIn success')
		    // req.flash('success', 'Logging in...');
        return next();
    };
    console.log('Unauthorized. User is not logged in...')
    req.flash('error', 'You must log-in to perform that action.');
    res.redirect('/login');
};


module.exports = isLoggedIn;