const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuarios-controller');

// CADASTRAR UM USUÁRIO
router.post('/cadastro', UsuariosController.cadastrarUsuario);

// LOGIN
router.post('/login', UsuariosController.Login);

module.exports = router;