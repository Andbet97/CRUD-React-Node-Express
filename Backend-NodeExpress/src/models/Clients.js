const { Schema, model } = require('mongoose');
const clientsCtrl = require('../controllers/clients.controller');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const clientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true
    },
    dni: {
        type: String,
        required: [true, 'DNI is required.'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: [validateEmail, 'Please fill a valid email address'],
        unique: true,
        trim: true
    },
    birthday_date: {
        type: Date,
        required: [true, 'Birthday date is required.']
    }
}, {
    timestamps: true
})

module.exports = model('Client', clientSchema);
