const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req,res) => res.send("Welcome"));

router.post('/usuario', controllers.createUsuario);
router.delete('/usuario', controllers.deleteUsuario);
router.get('/personas', controllers.getPersonas);
router.get('/usuario', controllers.getUsuario);
module.exports = router;