var mongoose = require('mongoose');
var Job = mongoose.model('Job');

module.exports.persist = function(req, res) {

    console.log('persisting jobs')
    var job = new Job();
  
    job.email = req.body.email;
    job.jobType = req.body.jobType;
    job.field = req.body.field;
  
    job.save(function(err) {
      res.status(200);
      res.json({
        "message" : "Job Request submit successfully"
      });
    });
  
  };