const express = require('express')
const User = require('../../models/v1/User')
const userController = require('../../controllers/v1/user')
const paginate = require('../../middleware/paginate')
const router = express.Router()

router.get('/:id', userController.getUser)

router.get('/', paginate(User), userController.indexUsers)

router.post('/',userController.createUser)

router.put('/:id',userController.updateUser)

module.exports = router