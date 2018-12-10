var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var notification = require('./notification');
var MongooseError = require('mongoose/lib/error');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {
  console.log('User registration start :%s',JSON.stringify(req.body));
  var user = new User();
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if(err){
      if (11000 === err.code || 11001 === err.code) {
        res.status(401);
        res.json({
          "msg":'User already exists'
        })
        // var valError = new MongooseError.ValidationError(err)
        // valError.errors["xxx"] = new MongooseError.ValidatorError('xxx', 'Duplicate found', err.err)
        // err = valError
      }else{
        res.status(500);
        res.json({
          "msg":'Internal server error'
        })
      }
      console.log('Error occur while saving user :%s',err);
    }else{
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    }
  });
};

module.exports.login = function (req, res) {
  console.log('LOGIN : ' + JSON.stringify(req.body));
  passport.authenticate('local', function (err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
      console.log('ERROR : find user from passport :%s',err);
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if (user) {
      console.log('User found from passport : %s', JSON.stringify(user));
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      console.log('Could not find a user from passport ');
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.resetPassword = function (req, res) {
  console.log('Password going to be reset : %s', JSON.stringify(req.body));
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function (err, user) {
    console.log('???????????????????????????????????????????????? %s', JSON.stringify(user))
    if (!err, user) {
      console.log('!!!!!!!!!!!!!!!!!!!! find successful user - password reset  !!!!! %s', JSON.stringify(user));
      // this.salt = crypto.randomBytes(16).toString('hex');
      // user.hash = crypto.pbkdf2Sync(req.body.newPassword, this.salt, 1000, 64, 'sha512').toString('hex');
      user.setPassword(req.body.newPassword);
      // user.hash = bcrypt.hashSync(req.body.newPassword, 10);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      user.save(function (er) {
        if (er) {
          console.log('User could not save %s', er);
        } else {
          // send the mail to user
          notification.sendNotification(req, res)
        }
      });
    }
  })
}