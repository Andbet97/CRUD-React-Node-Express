const { Router } = require('express');

const router = Router();

router.route('/')
    .get((req, res) => res.send('Clients works!'))
/*    .post()

router.route('/:id')
    .get((req, res) => res.send('Client works!'))
    .put()
    .delete()*/

module.exports = router;
