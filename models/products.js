const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }],
        required:true
    },
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'firm',
        required:true
    }
    
})

const Product = mongoose.model('product',productSchema);
module.exports=Product