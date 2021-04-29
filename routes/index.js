const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req,res) => res.send("Welcome"));

router.post('/newUsuario', controllers.createUsuario); //crear usuario
router.delete('/usuario', controllers.deleteUsuario); //eliminar usuario
router.get('/usuarios', controllers.getUsuarios); //
router.post('/usuario', controllers.getUsuario); //login
router.put('/usuario/:numeroTelefonico',controllers.updateUsuario); //actualizar usuario
module.exports = router;