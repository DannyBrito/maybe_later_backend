const express = require('express')

const userController = require('../../controllers/v1/user')
const router = express.Router()

router.get('/:id', userController.getUser)

router.get('/', userController.indexUsers)

router.post('/',userController.createUser)

module.exports = router