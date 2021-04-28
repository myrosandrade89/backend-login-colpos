const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req,res) => res.send("Welcome"));

router.post('/newUsuario', controllers.createUsuario);
router.delete('/usuario', controllers.deleteUsuario);
router.get('/usuarios', controllers.getUsuarios);
router.post('/usuario', controllers.getUsuario);
router.put('/usuario/:correo',controllers.updateUsuario);
module.exports = router;