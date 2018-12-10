var mongoose = require('mongoose');
var nodeMailer = require('nodemailer');
var User = mongoose.model('User');

jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
path = require('path'),
async = require('async'),
crypto = require('crypto'),
_ = require('lodash');
hbs = require('nodemailer-express-handlebars');


var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amilaaus84@gmail.com',
    pass: 'welcome!23'
  }
});
var html ='Hi Amila <br/>'
          +'Please click on the link below to reset your anpaai.com password:'
          +'<a href="" >sssssssssssssssssssssssssss</a>'
          +'<br/>'
          +'<br/>'
           +"If you didn't request to change your password, please ignore this email. Your password won't change unless you access the link above and create a new password."
          +'<br/>'
          +'<br/>'
           +'Regards,'
          +'The support team at anapaai.com'

// let mailOptions = {
//     from: 'amilaaus84@gmail..com', 
//     to: req.body.to, 
//     subject: req.body.subject, 
//     text: req.body.body,
//     html: '<b>Hi Amila</b><br/> click below link to change your password .<br/> <a href="">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>' // html body
// };

let mailOptions1 = {
  from: 'amilaaus84@gmail.com', // sender address
  to: 'akudahewa@gmail.com', // list of receivers
  subject: 'change password ', // Subject line
  text: "ssssssssssssssssssss", // plain text body
  html: html
};

module.exports.sendNotification = function(req, res) {
    console.log('Sending notification !!')
    transporter.sendMail(mailOptions1, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.json('success');
      });
  
  };

  var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./api/templates/'),
    extName: '.html'
  };
  
  transporter.use('compile', hbs(handlebarsOptions));

  exports.signUp = function(req,res){
    console.log()
  }
  
  exports.forgot_password = function(req, res) {
    console.log('Forget password for user :'+req.body.email)
    async.waterfall([
      function(done) {
        User.findOne({
          email:req.body.email
        }).exec(function(err, user) {
          if(err){
            console.log('Could not find the user to send forget password email :%s',err);
            done('Error occur while find user');
          }
          console.log('............................user ................. :%s',user)
          if(user!=null){
            done(err, user);
          }else{
            console.log('??????????????????????????? not found ?????????????//')
            done('User not found')
          }
          
        });
      },
      function(user, done) {
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        transporter.sendMail(setMailOption(user.email,user.firstname,token), (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Email %s sent: %s', info.messageId, info.response);
              res.json('success');
          });
      }
    ], function(err) {
      console.log('************************ error msg ************************* :%s',err);
      return res.status(422).json({ message: err });
    });
  };


  function setMailOption(email,name,token){
    let mailOptions ={
      from:'amilaaus84@gmail.com',
      to:email,
      subject: 'Password help has arrived! ',
      template: 'forgot-password-email',
      context:{
        url :'http://127.0.0.1:4201/reset-password?token=' + token,
        name: name
      }
    }
    console.log('Generated mailOption :%s',JSON.stringify(mailOptions));
    return mailOptions;
  }

  function initializeMail(body){
    let mailOption ={
      from:'amilaaus84@gmail.com',
      to:body.to,
      subject:body.subject,
      template:findTemplate(body.type),
      context:{
        url :'http://127.0.0.1:4200/reset-password?token=' + token,
        name: name
      }
    }
  }

  exports.send = function(req,res){
    transporter.sendMail(initializeMail(req.body),function(error,info){
      if(error){
        return error;
      }
      console.log('Email sent :%s',info.response);
      res.json('email successfully sent');
    });
  }

  function findTemplate(type){
    var template;
    if(type=='signup'){
      template = 'signup;' 
    }if(type=='forgot-password'){
      template='forgot-password'
    }
    return template;
  }