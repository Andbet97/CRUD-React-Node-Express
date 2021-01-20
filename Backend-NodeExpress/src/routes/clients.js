const { Router } = require('express');
const { getClients, createClient, getClient, updateClient, deleteClieny } = require('../controllers/clients.controller');

const router = Router();

router.route('/')
    .get(getClients)
    .post(createClient);

router.route('/:id')
    .get(getClient)
    .put(updateClient)
    .delete(deleteClieny);

module.exports = router;
