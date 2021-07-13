const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        max: 50
    },

    is_visible: {
        type: Boolean,
        required: false,
        default: true
    },

    images: [String],

    brand: {
        type: String,
        required: true,
        max: 50
    },

    shop: {
        type: mongoose.Types.ObjectId,
        ref: "shop",
        required: true
    },

    description: {
        type: String,
        required: true,
        min: 150
    },

    prix: {
        type: Number,
        required: true,
    },

    qte: {
        type: Number,
        required: true,
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "categorie",
        required: true
    },

},
{timestamps: true}
)

const Product = mongoose.model('produit', ProductSchema)

module.exports = Product