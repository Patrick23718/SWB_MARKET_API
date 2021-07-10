const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        max: 50
    },

    images: [{type: String}],

    // brand: {
    //     type: String,
    //     required: true,
    //     max: 50
    // },

    // shop: {
    //     type: String,
    //     required: true,
    //     max: 50
    // },

    // Description: {
    //     type: String,
    //     required: false,
    //     min: 150
    // },

    // prix: {
    //     type: Number,
    //     required: true,
    // },

    // qte: {
    //     type: Number,
    //     required: true,
    // },

    // category: {
    //     type: String,
    //     required: true,
    // },

    // created_at: {
    //     type: Date,
    // },

})

const Product = mongoose.model('produit', ProductSchema)

module.exports = Product