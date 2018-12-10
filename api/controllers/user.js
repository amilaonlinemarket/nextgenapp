var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var notification = require('./notification');

module.exports.update = function (req, res) {
    console.log('++++++++++++++++++++++++ update user +++++++++++++++++++++++++++++++++ %s',JSON.stringify(req.body));
    var condition ={
        'email':req.body.email
    }
    var update={
        'firstname':req.body.firstname,
        'lastname':req.body.lastname,
        'address':{
            'street':req.body.address.street,
            'city':req.body.address.city
        },
        'phone':req.body.phone
    }
    User.findOneAndUpdate(condition,update,{ multi:true },function(err,success){
        if(err){
            console.log('--------------------update failed ------------- :%s',err)
            res.status(500).json({
                "message" : "Internal server error"
              });
        }
        console.log('-----------update success ---------------')
        res.status(200).json({
            "message" : "Successfully updated"
          });
    })
    
};