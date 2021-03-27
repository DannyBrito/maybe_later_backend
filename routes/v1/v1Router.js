const express = require('express')

const userRouter = require('./user')

const authRouter = require('./auth')

const router = express.Router()

router.use('/users', userRouter)

router.use('/auth',authRouter)

module.exports = router