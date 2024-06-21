const mongoose =require('mongoose')
const firmSchema = new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {type:String,
        enum:['veg','non-veg']
              }
            ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south','north','chinese','quantinental']
            }
        ]
    },
   offer :{
        type:String
        
    },
    image:{
        type:String
    },
    vendor:
        {
            type:mongoose.Schema.Types.ObjectId,//to create a relation
            ref:'Vendor',
            required:true
        },
        product:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            }
        ]
    
    
});
module.exports = mongoose.model('firm',firmSchema);
