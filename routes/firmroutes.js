const express =require('express');
const firmController =require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');





const router = express.Router();
//Add firm
router.post('/addFirm', firmController.addFirm);
//delete firm
router.delete('/:firmId', firmController.deleteFirm);
//images 
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

module.exports = router;