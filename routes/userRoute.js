const express = require('express');
const userController = require('../controllers/userRegister');

const router = express.Router();

router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.get('/logout', userController.Logout)

module.exports = router;