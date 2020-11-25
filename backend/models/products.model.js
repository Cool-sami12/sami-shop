const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : { type: String, required: true},
    quantity :{ type: String, required: true}, 
    duration:{ type: Number, required: true},
    date:{ type: Date}
},{
    timestamps:true
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
