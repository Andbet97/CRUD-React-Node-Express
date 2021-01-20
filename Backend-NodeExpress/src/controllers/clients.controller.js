const clientsCtrl = {};

clientsCtrl.getClients = (req, res) => res.json({message: 'GET Request'});

clientsCtrl.createClient = (req, res) => res.json({message: 'POST Request'});

clientsCtrl.getClient = (req, res) => res.json({message: 'GET Request client'});

clientsCtrl.updateClient = (req, res) => res.json({message: 'PUT Request client'});

clientsCtrl.deleteClieny = (req, res) => res.json({message: 'DELETE Request client'});

module.exports = clientsCtrl;
