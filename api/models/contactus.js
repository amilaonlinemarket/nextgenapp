
var mongoose = require( 'mongoose' );

var contactUschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
email: {
  type: String,
  required: true
},
subject: {
  type: String
},
message: {
    type: String,
  }
});

mongoose.model('ContactUs', contactUschema);

  