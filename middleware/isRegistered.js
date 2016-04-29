var isRegistered = function (req, res, next){
    if(req.isAuthenticated()){
        // if(req.user.username == "Admin"){
          return next();
    //     } else{
    //       console.log('Unauthorized. User is not permitted to preform that action.')
    //       req.flash("error", "You are not permitted to preform that action.");
    //       res.redirect('/users');
    //     }
    // }
    // console.log('Unauthorized. User is not logged in...');
    // req.flash("error", "You must log-in to perform that action.");
    // res.redirect('/login');
		};
}

module.exports = isRegistered;