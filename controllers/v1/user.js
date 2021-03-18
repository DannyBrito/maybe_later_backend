const express = require('express')

const router = express.Router()

router.get('/', () => console.log('here'))

module.exports = router