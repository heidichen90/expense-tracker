const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/user')
const auth = require('./modules/auth')

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出總路由器
module.exports = router
