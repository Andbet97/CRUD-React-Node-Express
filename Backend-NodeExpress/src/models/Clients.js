const { Schema, model } = require('mongoose');
const clientsCtrl = require('../controllers/clients.controller');

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    birthday_date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Client', clientSchema);
