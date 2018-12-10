
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;


var vehicleschema = new schema({
    category: {
      root:{
        type: String,
        required: true
      },
      sub:{
        type: String,
        required: true
      }
    },
      name: {
        type: String,
        required: true
      },
      make:{
        type:String,
        required:true
      },
      type:{
        type:String,
        required:true
      },
      condition:{
        type:String,
        required:true
      },
      gear:{
        type:String,
        required:true
      },
      fuel:{
        type:String,
        required:true
      },
      owner:{
          name:{
            type:String
          },
          contactNo:{
              primary:{
                  type:String
              },
              secondary:[]
          }
      },
      keyPoints:[{
        display:{
          type: String
        },
        words:{
          type: String
        }
      }],
      description: {
          type: String,
          required: true
        },
        location: [
          {
            devision:{
              type: String,
              required: true
            },
            city:{
              type: String,
              required: true
            }
          }
        ],
        datePosted:{
          type: String,
        },
        img:{
          thumb:{
            type: String
          },
          otherImages:[]
        },
        price:{
          value:{
            type:Number
          },
          logic:{
            type:String
          }
        },
        displayIndex:{
          type:Number
        } 
});

module.exports = mongoose.model('Vehicle', vehicleschema);
