var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var multer = require('multer'); 

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
var data={}

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlUser =require('../controllers/user');
var ctrlJob = require('../controllers/job');
var ctrlContactUs = require('../controllers/contactus');
var ctrlNotification = require('../controllers/notification');
var ctrlBusiness = require('../controllers/business');
var ctrlHouse = require('../controllers/houses');
var ctrlEdu = require('../controllers/classes');
var ctrlVehicle = require('../controllers/vehicles');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.put('/profile', ctrlUser.update);
router.post('/login', ctrlAuth.login);
router.post('/job',ctrlJob.persist);
router.post('/contactUs',ctrlContactUs.persist);
router.post('/forgetpassword',ctrlNotification.forgot_password);
router.post('/resetPassword',ctrlAuth.resetPassword);
router.post('/email/signup',ctrlNotification.send);
// router.post('/business',ctrlBusiness.persist);
router.post('/education',ctrlEdu.persist);
router.get('/education',ctrlEdu.get);

router.post('/property',ctrlHouse.persist);
router.post('/property/filter',ctrlHouse.filter);
router.get('/property',ctrlHouse.get);
router.post('/vehicle',ctrlVehicle.persist);
router.get('/vehicle',ctrlVehicle.get);
router.post('/business',ctrlBusiness.persist);
router.get('/business',ctrlBusiness.get);
// router.post('/upload',ctrlBusiness.upload);
module.exports = router;





