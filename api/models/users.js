var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// var address =  new mongoose.Schema({
//   street: {type:String},
//   city: {type:String}
// });


var userSchema = new mongoose.Schema({
  firstname:{
    type:String,
  },
  lastname:{
    type:String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase:true,
    trim:true
  },
  address:{
    street: {type:String},
    city: {type:String}
  },
  phone:{
    type:String,
  },
  hash: String,
  salt: String,
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
}
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  console.log('this hash  :%s',this.hash);
  console.log('other hash :%s',hash);
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
