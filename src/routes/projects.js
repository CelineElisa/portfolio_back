const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()

router.get('/', (req, res) => {
    console.log("tu es sur la route get projects")
})

module.exports = router