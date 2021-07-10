const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    
    catName: {
        type: String,
        required: true,
        max: 50
    },

    catDescription: {
        type: String,
        required: false,
        max: 150
    },

    categoryURL: {
        type: String,
        required: false,
    },

})

const Category = mongoose.model('categorie', CategorySchema)

module.exports = Category