'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;


var busSchema = new schema({
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
      owner:{
        name:{
          type:String
        },
        title:{
          type:String
        },
        contactNo:{
            primary:{
                type:String
            },
            secondary:[]
        },
        email:{
          type:String
        }
    },
      keyPoints:[{
        display:{
          type: String
        },
        words:{
          type: String
        },
        isHighlight:{
          type:Boolean
        }
      }],
      description: {
          type: String,
          required: true
        },
        location: [
          {
            streetAddres:{
              type:String
            },
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
        } ,
        displayIndex:{
          type:Number
        }
});

module.exports = mongoose.model('Business', busSchema);
