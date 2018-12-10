var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    console.log('Access PASSPORT :%s,%s',username,password);
    User.findOne({ email: username }, function (err, user) {
      if (err) { 
        console.log('ERROR : Find user from PASSPORT :%s',err);
        return done(err);
       }
      // Return if user not found in database
      if (!user) {
        console.log('PASSPORT : User not found');
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        console.log('PASSPORT : Not a valid password');
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      console.log('PASSPORT : found a user !!!')
      return done(null, user);
    });
  }
));