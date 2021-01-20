const Client = require('../models/Clients');
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
    })
    await newClient.save();
    res.json({message: 'Created client.'});
}

clientsCtrl.getClient = async (req, res) => {;
    const client = await Client.findById(req.params.id);
    res.json(client);
}

clientsCtrl.updateClient = async (req, res) => {
    const { name, dni, email, birthday_date } = req.body;
    await Client.findOneAndUpdate({_id: req.params.id}, {
        name,
        dni,
        email,
        birthday_date
    });
    res.json({message: 'Updated client.'});
}

clientsCtrl.deleteClieny = async (req, res) => {
    await Client.findOneAndDelete({_id: req.params.id});
    res.json({message: 'Deleted client.'});
}

module.exports = clientsCtrl;
