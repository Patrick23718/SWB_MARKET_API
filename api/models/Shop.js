const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },

    userID: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },

    shopName: {
        type: String,
        required: true,
        max: 50
    },

    shopDescription: {
        type: String,
        required: true,
        min: 150
    },

    shopBannerURL: {
        type: String,
        required: false,
    },

    shopAdresse: {
        type: mongoose.Types.ObjectId,
        ref: "adresse",
        required: false
    },

    created_at: {
        type: Date,
        // default: new Date()
    }
})

ShopSchema.pre('save', (next) => {
    this.created_at = new Date()
    next()
})

const Shop = mongoose.model('shop', ShopSchema)

module.exports = Shop