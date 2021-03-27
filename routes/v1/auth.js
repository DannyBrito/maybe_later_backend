const express = require('express')
const authController = require('../../controllers/v1/auth')
const router = express.Router()

router.post('/login', authController.create)

router.get('/auto_login', authController.autoLogin)

module.exports = router