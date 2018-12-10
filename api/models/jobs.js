var mongoose = require( 'mongoose' );

var jobSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    jobType: {
      type: String,
      required: true
    },
    field: {
        type: String,
        required: true
      }
  });

  mongoose.model('Job', jobSchema);