var mongoose = require('mongoose');
require('../models/business');
var Business = mongoose.model('Business');
var dateTime = require('node-datetime');
var fs = require('fs');
var multer = require('multer');
var Promise = require('bluebird');
// set the directory for the uploads to the uploaded to

var DIR = './uploads/';

const imageFilter = function (req, file, cb) {
    // accept image only
    console.log('multer image filtering in progress');
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        console.log('multer : could not find any matching image file');
        return cb(new Error('Image files allowed'), false);
    }
    console.log('multer : No errors in image filtering')
    cb(null, true);
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('multer seaching the upload folder');
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    var fName =(req.body.category).concat((req.body.sub),(req.body.name),(file.originalname));
    console.log('multer generated file name :%',fName);
    cb(null, fName)
  }
})

var upload = multer({storage: storage,fileFilter:imageFilter,limits:{files : 5}}).array('image')

// var tryme = function(){
//     console.log('try me original name :'+file.originalname)
//    return true;
// }
// function tryme(){
//     console.log('try me !!!!!!!!!!!!!!!')
//     return true;
// }
var tryme = function(cb){
    console.log('try me ....xx..')
    var x ="fff";
    cb(null,x);
}

function loadLocation(locations){
    console.log('Processing address :%s',JSON.stringify(locations))
    var location=[];
    return new Promise(function(resolve,reject){
        if(locations!=undefined){
            var loc = locations.split("||");
            loc.forEach(element => {
                var address ={
                    streetAddres:element.split("|")[0],
                    devision:element.split("|")[1],
                    city:element.split("|")[1],
                }
                if(address.streetAddres!="" || address.devision !=null || address.city!=null ){
                    location.push(address);
                }
                
            });
        }
        console.log('Generated locations :%s',JSON.stringify(location));
        return resolve(location);
    })
}

function loadPoints(infos){
    console.log('Processing features :%s',JSON.stringify(infos))
    var businessFeatures=[];
    return new Promise(function(resolve,reject){
        if(infos!=undefined){
            var points = infos.split("||");
            points.forEach(element => {
                var features={
                    display:element.split("|")[0],
                    words:element.split("|")[1],
                    isHighlight:element.split("|")[2]
                   }
                   businessFeatures.push(features);
            });
        }
        console.log('Generated features :%s',JSON.stringify(businessFeatures));
        return resolve(businessFeatures);
    });
};

function loadImagePaths(req){
    var imagePath=[];
    return new Promise(function(resolve,reject){
        req.files.forEach(element => {
            imagePath.push("http://localhost:3000/".concat(element.path));
        });
        console.log("Generated image paths :%s",imagePath);
        return resolve(imagePath);
    })
};


module.exports.persist = function(req, res) {
    var path = '';
    var location=[];
    var imagePath=[];
    console.log('API start persisting business');
    upload(req, res, function (err) {
        console.log('Upload process finished :%s',err)
       if (err) {
           if(err.message.toString().replace(/\s/g, "")==="Toomanyfiles"){
            return res.status(500).send("you can upload maximum 2 images" );
           }else if(err.message.toString().replace(/\s/g, "")==="Filetoolarge"){
            return res.status(500).send("File size is too large" );
           }else if(err.message.toString().replace(/\s/g, "")==="Imagefilesallowed"){
            return res.status(500).send("Only image files are allowed!" );
           }
           else{
            return res.status(500).send("Something went wrong!! .Try again" );
           }
       }
       console.log('Creating buisness object');
       var business = new Business 
       business.category.root = req.body.category;
       business.category.sub = req.body.sub;
       business.name = req.body.name;
       business.description = req.body.description;
       business.owner.name = req.body.owner;
       business.owner.title = req.body.title;
       business.owner.email = req.body.email;
       if((req.body.phone.split("|")).length ==1){
           if(req.body.phone.split("|")[0]=="NOT_GIVEN"){
            business.owner.contactNo = [];
           }else{
            business.owner.contactNo = req.body.phone.split("|");
           }
       }
       business.owner.contactNo = req.body.phone.split("|");
       business.price.value = req.body.price;
       business.price.logic = req.body.rate;
       business.datePosted = dateTime.create().format('Y-m-d H:M:S');
       return loadLocation(req.body.location)
       .then(function(loc){
        business.location = loc;
            return loadPoints(req.body.keyPoints);
       }).then(function(feature){
            business.keyPoints =feature;
            return loadImagePaths(req);
       }).then(function(images){
        business.images =images;
        console.log('Ready to persist business object :%s',JSON.stringify(business));
        business.save(function(err) {
            if(err){
              console.log('Error while saving business :%s',err);
              return res.status(500).send("Internal server error");
            }
            console.log("Successfully persisted business object")
            return res.status(200).send({
                message: 'Business successfully created'});
          })
       });
 }); 
};

  module.exports.filter = function(req,res){
    console.log('Filter data set :%s',req.body)
    let condition=req.query;
    var option = req.body;
    Business.find(condition).sort({price:'ASC'}).exec(function(err,success){
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

//   module.exports.upload = function(request,res){
//       console.log('server got upload request !!!!!!!!!!ggggg! '+request.files)
//     for (var key in request.files) {
//         console.log('................................ '+key);
//         if (request.files.hasOwnProperty(key)) {
//           fs.renameSync(request.files[key].path, `${__dirname}/../uploads/${request.files[key].name}`);
//           console.log('----------------------renamed sync completed ...................')
//         }
//       }
//     res.send(202, { message: 'File uploaded' });
//   }

//   module.exports.upload = function(req,res){

//   }
//   app.post("/upload", multer({dest: "./uploads/"}).array("uploads", 12), function(req, res) {
//     res.send(req.files);
// });

module.exports.get = function(req,res){
      console.log('URL :%s',req.protocol + '://' + req.get('host') + req.originalUrl)
     let condition=buildQuery(req.query.root,req.query.sub,req.query.city,req.query.devision);
     console.log('GET: Retrive house details : %s',JSON.stringify(condition));
     console.log('++++++++++++++++++++++++++++++++++++ %s',req.query.sort)
     if(req.query.sort!=undefined){
         console.log('????????????????????????????????? '+req.query.sort)
            Business.find(condition).sort(this.sortLogic(req.query.sort)).exec(function(err,success){
                if(err){
                    console.log('GET :Could not complete the request  :%s',err)
                    res.status(500).json({
                        "message" : "Internal server error"
                      });
                }
                //console.log('GET: request successfully completed :%s',JSON.stringify(success))
                res.status(200).json({
                    "result" : success
                  });
            });
     }else{
        console.log('==================================finding a business ==xxx=================='+JSON.stringify(condition))
        Business.find(condition).sort({'displayIndex':1,'datePosted':1})
        .select({"_id":1,"name":1,"description":1,"price":1,"location":1,"keyPoints":1,"owner":1,"category":1,"images":1,"datePosted":1})
        .exec(function(err,success){
            if(err){
                console.log('GET :Could not complete the request  :%s',err)
                res.status(500).json({
                    "message" : "Internal server error"
                  });
            }
            // console.log('GET: request successfully completed :%s',JSON.stringify(success))
            res.contentType('application/json');
            // res.contentType(success[0].img.contentType);
            console.log('success :'+JSON.stringify(success))
            res.send(success);
            // res.type('image/png').
            // status(200).send({
            //     "result" : success[0].img
            //   });
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

buildQuery= function(root,sub,city,devision){
    console.log('==========build a query ==================%s %s %s %s',root,sub,city,devision)
    var query ={};
    if(root !=undefined){
        query['category.root']=root
        console.log('........................qqq......'+JSON.stringify(query))
    }if(sub!=undefined){
        query['category.sub']=sub;
    }if(city !=undefined){
        query['location.city']=city
    }if(devision!=undefined){
        query['location.devision']=devision
    }
    console.log('1111111111111qqqqqqqqqqqqq :'+JSON.stringify(query))
    return query;
}