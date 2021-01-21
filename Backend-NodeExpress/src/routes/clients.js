const { Router } = require('express');
const { getClients, createClient, getClient, updateClient, deleteClient } = require('../controllers/clients.controller');

const router = Router();

router.route('/')
    .get(getClients)
    .post(createClient);

router.route('/:id')
    .get(getClient)
    .put(updateClient)
    .delete(deleteClient);

module.exports = router;
