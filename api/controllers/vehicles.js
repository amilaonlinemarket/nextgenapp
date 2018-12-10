var mongoose = require('mongoose');
require('../models/vehicles');
var Vehicle = mongoose.model('Vehicle');
var dateTime = require('node-datetime');

module.exports.persist = function(req, res) {
    console.log('persisting house information ')
    var vehicle = new Vehicle
    vehicle.category.root = req.body.category.root;
    vehicle.category.sub = req.body.category.sub;
    vehicle.name = req.body.name;
    vehicle.make = req.body.make;
    vehicle.type = req.body.type;
    vehicle.condition = req.body.condition;
    vehicle.gear = req.body.gear;
    vehicle.fuel = req.body.fuel;
    vehicle.description = req.body.description;
    vehicle.owner.name = req.body.owner.name;
    vehicle.owner.contactNo = req.body.owner.contactNo;
    vehicle.keyPoints =req.body.keyPoints;
    vehicle.location = req.body.location;
    vehicle.img.thumb = req.body.img.thumb;
    vehicle.img.otherImages = req.body.img.otherImages;
    vehicle.price = req.body.price;
    vehicle.displayIndex = req.body.displayIndex;
    vehicle.datePosted = dateTime.create().format('Y-m-d H:M:S');
    console.log('>>>>>>>>>>>>>>>ssssssssssss    >>>>>>>>>>>>>>>>>> %s',dateTime.create().format('Y-m-d H:M:S'))
    console.log('...................date posted ............... %s',vehicle.datePosted);

    vehicle.save(function(err) {
      if(err){
        console.log('Error while saving house :%s',err);
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

//   module.exports.get = function(req,res){
//     console.log('................base url .qqqq........... %s',req.protocol + '://' + req.get('host') + req.originalUrl)
//      let condition=req.query;
//      console.log('GET: Retrive education details : %s',JSON.stringify(condition))
//      Vehicle.find(condition,function(err,success){
//         if(err){
//             console.log('GET :Could not complete the request  :%s',err)
//             res.status(500).json({
//                 "message" : "Internal server error"
//               });
//         }
//         console.log('GET: request successfully completed :%s',JSON.stringify(success))
//         res.status(200).json({
//             "result" : success
//           });
//     });
// }
module.exports.filter = function(req,res){
  console.log('Filter data set :%s',req.body)
  let condition=req.query;
  var option = req.body;
  Vehicle.find(condition).sort({price:'ASC'}).exec(function(err,success){
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
    Vehicle.find(condition).sort(utility.setSort(req.query.sort)).exec(function(err,success){
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
    Vehicle.find(condition).sort({'displayIndex':1,'datePosted':1}).exec(function(err,success){
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

buildQuery= function(root,sub,city,devision){
  var query ={};
  if(root !=undefined){
      query['category.root']=root
  }if(sub!=undefined){
      query['category.sub']=sub;
  }if(city !=undefined){
      query['location.city']=city
  }if(devision!=undefined){
      query['location.devision']=devision
  }
  console.log('qqqqqqqqqqqqq :'+JSON.stringify(query))
  return query;
}