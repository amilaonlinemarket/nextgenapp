var mongoose = require('mongoose');
require('../models/classes');
var Education = mongoose.model('education');
var dateTime = require('node-datetime');
var utility = require('../utils/utility');

module.exports.persist = function(req, res) {
    console.log('persisting edu ')
    var education = new Education
    education.category.root = req.body.category.root;
    education.category.sub = req.body.category.sub;
    education.name = req.body.name;
    education.description = req.body.description;
    education.tutor.name = req.body.tutor.name;
    education.tutor.qualification = req.body.tutor.qualification;
    education.tutor.contact = req.body.tutor.contact;
    education.keyPoints =req.body.keyPoints;
    education.location = req.body.location;
    // edu.location = req.body.location.city;
    education.displayIndex = req.body.displayIndex;
    education.img.thumb = req.body.img.thumb;
    education.img.otherImages = req.body.img.otherImages;
    education.price = req.body.price;
    education.datePosted = dateTime.create().format('Y-m-d H:M:S');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> %s',dateTime.create().format('Y-m-d H:M:S'))
    console.log('...................date posted ............... %s',education.datePosted);
    education.save(function(err) {
      if(err){
        console.log('Error while saving edu :%s',err);
        res.status(500);
        res.json({
        "message" : "Request failed"
        });
      }
      res.status(200);
      res.json({
        "message" : "Job Request submit successfully"
      });
    });
  };

  module.exports.get = function(req,res){
    console.log('................base url .qqqq........... %s',req.protocol + '://' + req.get('host') + req.originalUrl)
     let condition=req.query;
     console.log('GET: Retrive education details : %s',JSON.stringify(condition))
      Education.find(condition,function(err,success){
        if(err){
            console.log('GET :Could not complete the request  :%s',err)
            res.status(500).json({
                "message" : "Internal server error"
              });
        }
        console.log('GET: request successfully completed :%s',JSON.stringify(success))
        res.status(200).json({
            "result" : success
          });
    });
}
module.exports.filter = function(req,res){
  console.log('Filter data set :%s',req.body)
  let condition=req.query;
  var option = req.body;
  Education.find(condition).sort({price:'ASC'}).exec(function(err,success){
      if(err){
          console.log('GET :Could not complete the request  :%s',err)
          res.status(500).json({
              "message" : "Internal server error"
            });
      }
      console.log('GET: request successfully completed :%s',JSON.stringify(success))
      res.status(200).json({
          "result" : success
        });
  });
};

module.exports.get = function(req,res){
    console.log('................base url ............ %s',req.protocol + '://' + req.get('host') + req.originalUrl)
   let condition=buildQuery(req.query.root,req.query.sub,req.query.city,req.query.devision);
   console.log('GET: Retrive house details : %s',JSON.stringify(condition));
   if(req.query.sort!=undefined){
        Education.find(condition).sort(utility.setSort(req.query.sort)).exec(function(err,success){
              if(err){
                  console.log('GET :Could not complete the request  :%s',err)
                  res.status(500).json({
                      "message" : "Internal server error"
                    });
              }
              console.log('GET: request successfully completed :%s',JSON.stringify(success))
              res.status(200).json({
                  "result" : success
                });
          });
   }else{
    Education.find(condition).sort({'displayIndex':1,'datePosted':1}).exec(function(err,success){
          if(err){
              console.log('GET :Could not complete the request  :%s',err)
              res.status(500).json({
                  "message" : "Internal server error"
                });
          }
          console.log('GET: request successfully completed :%s',JSON.stringify(success))
          res.status(200).json({
              "result" : success
            });
      });
   }
}

sortLogic1 = function (number) {
  var sort = {};
  console.log('=====================xxxxxx========nnnnnnnnnnnnnnnn ===== %s', number)
  if (number == 1) {
    sort = {'price.value': 'asc' }
    // sort['price.value'] = 'asc'
  } else if (number == 2) {
    sort = {'price.value': 'desc' }
    // sort['price.value'] = 'desc'
  } else if (number == 3) {
    sort = { datePosted: 1 }
    // sort['datePosted'] = 1
  } else if (number == 4) {
    sort = { datePosted: -1 }
    // sort['datePosted'] = -1
  }
  console.log('------------sort ----------------- %s', JSON.stringify(sort));
  return sort
}

// buildQuery= function(root,sub,city,devision){
//   var query ={};
//   if(root !=undefined){
//       query['category.root']=root
//   }if(sub!=undefined){
//       query['category.sub']=sub;
//   }if(city !=undefined){
//       query['location.city']=city
//   }if(devision!=undefined){
//       query['location.devision']=devision
//   }
//   console.log('qqqqqqqqqqqqq :'+JSON.stringify(query))
//   return query;
// }