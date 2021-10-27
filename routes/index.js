const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/user')

router.use('/', home)
router.use('/records', records)
router.use('/users', users)

// 匯出總路由器
module.exports = router
