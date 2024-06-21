const vendorcontroller = require('../controllers/vendorController')

const express=require('express')
 
const router = express.Router();
//Register vendor
router.post('/register',vendorcontroller.venderRegister);
//Login Vendor
router.post('/login',vendorcontroller.vendorLogin);
//Get all Vendors
router.get('/all-vendors',vendorcontroller.getAllvendors);
//Get single vendor by ID
router.get('/getVendor/:apple',vendorcontroller.getVendorById)

module.exports=router;
