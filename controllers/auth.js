var express = require('express');
var router = express.Router();
var passport = require('../config/passport.js');
var User = require('../models/users.js');
var jwt = require('jsonwebtoken');

// Initialize passport
router.use(passport.initialize());

// router.post('/', function(req, res) {
// 	console.log(passport.authenticate);
// 	res.send('yes');
// })

// Log in and if successful, send back the token
// We need to install express-flash for flash messages to work
// We would also have to add the failureFlash; true option here, exp: { session: false, failureFlash : true }
router.post('/', passport.authenticate('local', { session: false }), function(req, res, next) {
	console.log('••••••••••••••••••••••');
	console.log('LOG IN AS ' + req.user.username );
	console.log('••••••••••••••••••••••');

	// Maybe don't sign with entire user
	var token = jwt.sign(req.user, process.env.JWT_SECRET, {
		expiresIn: 1440 // Expires in 24 hours
	});

	console.log(token);
	res.json({ token: token });

});

module.exports = router;