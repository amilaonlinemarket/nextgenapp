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
        contactNo:[],
        email:{
          type:String
        }
    },
      keyPoints:[
        {
          display:{
            type: String
          },
          words:{
            type: String
          },
          isHighlight:{
            type:Boolean
          }
        }
      ],
      description: {
          type: String
        },
        location: [
          {
            streetAddres:{
              type:String
            },
            devision:{
              type: String
            },
            city:{
              type: String
            }
          }
        ],
        datePosted:{
          type: String,
        },
        images:[],
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
        },
        img:[{ data: Buffer, 
          contentType: String }]
});

module.exports = mongoose.model('Business', busSchema);
