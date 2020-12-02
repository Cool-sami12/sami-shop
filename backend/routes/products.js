const router = require('express').Router();
const Product = require('../models/products.model');
const productController= require('../controllers/products');
const authAdmin = require('../middleware/adminauth');

router.get('/', (req, res) => {
  Product.find()
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

//register Routes
router.post('/register',authAdmin,   productController.Register); 




module.exports = router;