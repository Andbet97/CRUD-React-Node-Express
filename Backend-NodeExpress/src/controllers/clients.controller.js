const Client = require('../models/Clients');
const assert = require('assert').strict;

const handleErrors = (error) => {
    let errors = {}

    // duplicate error code
    if (error.code === 11000) {
        if (error.keyValue['dni']) {
            errors['dni'] = ['Already exist user with this dni.']
        }
        if (error.keyValue['email']) {
            errors['email'] = ['Already exist user with this email.']
        }
    }

    // validation errors
    if (error.message.includes('validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {
            if (errors[properties.path]) {
                errors[properties.path].push(properties.message);
            } else {
                errors[properties.path] = [properties.message];
            }
        });
    }

    return errors;
}

const clientsCtrl = {};

clientsCtrl.getClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
}

clientsCtrl.createClient = async (req, res) => {
    const { name, dni, email, birthday_date } = req.body;
    const newClient = new Client({
        name,
        dni,
        email,
        birthday_date
    });

    try {
        await newClient.save();
        res.json({ message: 'Client created.' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors: errors });
    }
}

clientsCtrl.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch {
        res.status(400).json({ error: 'error, client not found' });
    }
}

clientsCtrl.updateClient = async (req, res) => {
    const { name, dni, email, birthday_date } = req.body;

    try {
        await Client.findOneAndUpdate({ _id: req.params.id }, {
            name,
            dni,
            email,
            birthday_date
        });
        res.json({ message: 'Updated client.' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors: errors });
    }
}

clientsCtrl.deleteClient = async (req, res) => {
    try {
        await Client.findOneAndDelete({ _id: req.params.id });
        res.json({ message: 'Client deleted.' });
    } catch {
        res.status(400).json({ error: 'error, client not found' });
    }
}

module.exports = clientsCtrl;
