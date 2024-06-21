// const { verifyToken } = require('../middlewares/verifyToken');
const Firm =require('../models/firm');
const Vendor=require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '/uploads'); // Specify the directory where files will be stored
    },
    filename: function(req, file, callback) {
        callback(null,Date.now()+Path.extname(file.fieldname)); // Set the filename (you can customize this)
    }
});

const upload = multer({ storage:storage }); // Define the upload middleware

const addFirm = async(req,res)=>{
    try{
    const {firmname,area,category,region,offer}=req.body;

    const image = req.file? req.file.filename:undefined;

    

    if (!req.vendor || !req.vendor.id) {
        return res.status(401).json({ msg: 'Authorization denied, invalid token' })
    }
    const newFirm = new Firm({
        firmname,area,category,region,offer,image,vendor:req.vendor.id
    });

    await newFirm.save();
   await Vendor.findByIdAndUpdate(req.vendor.id, {
    $push: { Firm: newFirm._id }
});
  
    return res.status(200).json({message:'Firm added successfully'});
}catch(error){
  console.log(error);
  res.status(500).json({error:'Internal server error'});
}

};
module.exports.deleteFirm = async (req, res) => {
    try {
      const firm = await Firm.findById(req.params.firmId);
      if (!firm) {
        return res.status(404).json({ msg: 'Firm not found' });
      }
  
      await firm.remove();
      res.json({ msg: 'Firm removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
module.exports={addFirm:[upload.single('image'),addFirm]}//process to export images