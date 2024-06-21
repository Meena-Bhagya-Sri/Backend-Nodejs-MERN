const express =require("express");
const app = express();
const vendorRoutes = require('./routes/vendorroutes');
const firmRoutes = require('./routes/firmroutes');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const dotEnv=require('dotenv');
const productroutes =require('./routes/productroutes');
const cors = require('cors');
const path=require('path');
const port =4000;

 dotEnv.config();//access environmental variables

 mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("mongodb connected successfully"))
 .catch((err)=>console.log(err))
 app.use(cors());
app.use(bodyParser.json()); 
 app.use('/vendor',vendorRoutes);
 app.use('/firm',firmRoutes);
 app.use('/product',productroutes);
 app.use('/uploads',express.static('uploads'));

app.listen(port ,()=>
{
    console.log(`Server started and running at https://localhost:${port}`);
});

app.use('/home',(req,res)=>{
res.send(`<h1>Welcome to RK`);
})