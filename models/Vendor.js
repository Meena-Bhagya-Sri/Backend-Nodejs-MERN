const mongoose=require('mongoose');

const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    Firm:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
});
module.exports=mongoose.model('Vendor',vendorSchema);

