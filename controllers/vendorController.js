const Vendor=require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();
 
const secretKey = process.env.JWT_SECRET;

const venderRegister = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const Vendoremail = await Vendor.findOne({email});
        if(Vendoremail)
            {
              return res.status(400).json ({message:"email already taken"}); 
            }
            const hashedpassword=await bcrypt.hash(password,10);
              
            const newVendor = new Vendor({
                username,
                email,
                password:hashedpassword
            });
            await newVendor.save();

        const payload = {
            vendor: {
                id: Vendor.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

            res.status(201).json({message:"Vendor Registered successfully"});
             
            console.log("registered");
  
        }catch(error){
         res.status(500).json({error:"Internal Server error"});
         console.log(error);
    }
}

const vendorLogin=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const vendor1=await Vendor.findOne({email});
        // const vendor2=await Vendor.findOne({username});
        if(!vendor1 || !await bcrypt.compare(password,vendor1.password))
            {
                return res.status(401).json({message:"Invalid username or email or pasword"});

            }
            const payload = {
                vendor: {
                    id: vendor1.id,
                },
            };
    
           const token= jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
                // (err, token) => {
                //     if (err) throw err;
                //     res.json({ token });
                // }
            );

            res.status(203).json({message:"Login Successfull",token});
            console.log(email);  
            //console.log(token);
        }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal Server error"});
    }
};

const getAllvendors= async (req,res)=>{
    try{
     const vendors = await Vendor.find().populate('firm');
     res.json({vendors}) 
    }catch(e)
    {
        console.log(e);
        res.status(500).json({error:"Internal Server error"});
    }
}

const getVendorById =async(req,res)=>
    {
        const vendorId=req.params._id;
        try{
            const vendor = await Vendor.findById(vendorId).populate('firm');
            if(!vendor)
                {
                    return res.status(404).json({error:"Vendor Not Found"})

                }
                res.ststus(200).json({vendor})
        }catch(e)
        {
            console.log(e);
        res.status(500).json({error:"Internal Server error"});
        }
    }


module.exports ={ venderRegister,vendorLogin,getAllvendors,getVendorById}