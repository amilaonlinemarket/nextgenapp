var mongoose = require('mongoose');
require('../models/houses');
var House = mongoose.model('House');
var dateTime = require('node-datetime');

module.exports.persist = function(req, res) {
    console.log('persisting house information ')
    var house = new House
    house.category.root = req.body.category.root;
    house.category.sub = req.body.category.sub;
    house.name = req.body.name;
    house.description = req.body.description;
    house.owner.name = req.body.owner.name;
    house.owner.contactNo = req.body.owner.contactNo;
    house.keyPoints =req.body.keyPoints;
    house.location = req.body.location;
    house.img.thumb = req.body.img.thumb;
    house.img.otherImages = req.body.img.otherImages;
    house.price = req.body.price;
    house.displayIndex = req.body.displayIndex;
    house.datePosted = dateTime.create().format('Y-m-d H:M:S');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> %s',dateTime.create().format('Y-m-d H:M:S'))
    console.log('...................date posted ............... %s',house.datePosted);
    house.save(function(err) {
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

  module.exports.filter = function(req,res){
    console.log('Filter data set :%s',req.body)
    let condition=req.query;
    var option = req.body;
    House.find(condition).sort({price:'ASC'}).exec(function(err,success){
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
     console.log('++++++++++++++++++++++++++++++++++++ %s',req.query.sort)
     if(req.query.sort!=undefined){
         console.log('????????????????????????????????? '+req.query.sort)
            House.find(condition).sort(this.sortLogic(req.query.sort)).exec(function(err,success){
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
         console.log('==================================finding a house ====================')
        House.find(condition).sort({'displayIndex':1,'datePosted':1}).exec(function(err,success){
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

sortLogic = function (number) {
    var sort={};
    console.log('========================ssssss=====nnnnnnnnnnnnnnnn ===== %s',(number == 2))
    if (number == 1) {
        sort = {'displayIndex':1,'price.value': 'asc' }
    } else if (number == 2) {
        console.log('ssssssssssssssssssssssssssss %s',sort)
        sort = {'displayIndex':1, 'price.value': 'desc' }
    } else if (number == 3) {
        sort = {displayIndex:1, datePosted: 1 }
    } else if (number == 4) {
        sort = {displayIndex:1, datePosted: -1 }
    }
    console.log('------------sort ----------------- %s',JSON.stringify(sort));
    return sort
}

// buildQuery= function(root,sub,city,devision){
//     var query ={};
//     if(root !=undefined){
//         query['category.root']=root
//     }if(sub!=undefined){
//         query['category.sub']=sub;
//     }if(city !=undefined){
//         query['location.city']=city
//     }if(devision!=undefined){
//         query['location.devision']=devision
//     }
//     console.log('qqqqqqqqqqqqq :'+JSON.stringify(query))
//     return query;
// }