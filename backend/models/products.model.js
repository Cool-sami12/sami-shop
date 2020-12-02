const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : { type: String, required: true},
    quantity :{ type: String, required: true}, 
    category :{ type: String, required: true},
    price :{ type: Number, required: true},  
    duration:{ type: Number, required: true},
    supplier_location:{type: String, required: true},
    expiry_date:{ type: Date}
},{
    timestamps:true
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
