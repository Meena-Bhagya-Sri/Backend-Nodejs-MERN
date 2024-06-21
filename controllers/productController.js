// const Product = require('../models/products');
const Firm = require('../models/firm');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path'); // Required for path manipulation

// Setup multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads'); // Specify the directory where files will be stored (relative path)
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname)); // Set the filename with timestamp and original extension
    }
});

const upload = multer({ storage: storage }); // Define the upload middleware

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

        // Check if firmId is valid
        if (!mongoose.Types.ObjectId.isValid(firmId)) {
            return res.status(400).json({ message: 'Invalid firm ID' });
        }

        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const newProduct = new Product({
            productName,
            price,
            category,
            bestseller,
            image,
            description,
            firm: firmId
        });

        const savedProduct = await newProduct.save();

        firm.products.push(savedProduct._id); // Assuming `products` is the field in Firm model to store product references
        await firm.save();

        res.status(200).json(savedProduct);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllProductsByFirm = async (req, res) => {
    try {
        const products = await Product.find().populate('firm');
        res.json(products);
    } catch (err) {
        console.error('Error in getAllProductsByFirm:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(productId).populate('firm', 'firmName');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error('Error in getProduct:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    addProduct: [upload.single('image'), addProduct],
    getAllProductsByFirm,
    getProduct,
    deleteProduct
};
