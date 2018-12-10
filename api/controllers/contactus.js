var mongoose = require('mongoose');
var ContactUs = mongoose.model('ContactUs');

module.exports.persist = function (req, res) {

  console.log('persisting contact us :%s',JSON.stringify(req.body))
  var contactUs = new ContactUs();

  contactUs.name = req.body.name;
  contactUs.email = req.body.email;
  contactUs.subject = req.body.subject;
  contactUs.message = req.body.message;

  contactUs.save(function (err) {
    if (err) {
      console.log('==================================== :%s',err);
      res.status(500);
      res.json({ "error": "Could not submit your request. Try again" });
    } else {
      res.status(200);
      res.json({
        "message": "Successfully submit your request"
      });
    }
  });
};
