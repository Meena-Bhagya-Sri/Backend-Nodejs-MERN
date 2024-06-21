const express =require('express');
const productController =require('../controllers/productController');
const auth = require('../middlewares/verifyToken');
const path=require('path');


//console.log(productController);
const router = express.Router();
//Add product
router.post('/addProduct/:firmId',productController.addProduct);
//get all pros by firm id
router.get('/products', productController.getAllProductsByFirm);
//one product
router.get('/product/:id', productController.getProduct);
//delete product
router.delete('/:productId', productController.deleteProduct);
//images

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.setHeader('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
module.exports = router;
// const express = require('express');
// const productController = require('../controllers/productController');
// const auth = require('../middlewares/verifyToken');
// const path = require('path');
// const router = express.Router();

// // Add product
// router.post('/addProduct/:firmId', auth, productController.addProduct);

// // Get all products by firm id
// router.get('/products', auth, productController.getAllProductsByFirm);

// // Get one product
// router.get('/product/:id', auth, productController.getProduct);

// // Delete product
// router.delete('/:productId', auth, productController.deleteProduct);

// // Images
// router.get('/uploads/:imageName', (req, res) => {
//     const imageName = req.params.imageName;
//     res.setHeader('Content-Type', 'image/jpeg');
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
// });

// module.exports = router;
