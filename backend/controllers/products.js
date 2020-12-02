const Product = require('../models/products.model');


module.exports = {
    Register:( async(req,res) => {
        try {
            const product = new Product(req.body);
             
            await product.save();
            
            res.status(201).send({product, message: 'Products Registration was Successful'});
            
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
            
        }
    })

}