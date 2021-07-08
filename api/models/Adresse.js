const mongoose = require('mongoose');

const AdresseSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },

    countryCode: {
        type: String,
        required: true
    },

    town: {
        type: String,
        required: true
    },

    quarter: {
        type: String,
        required: true
    },
})


const Adresse = mongoose.model('adresse', AdresseSchema)

module.exports = Adresse