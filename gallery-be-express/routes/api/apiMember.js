const express = require('express')
const createError = require('http-errors')
const router = express.Router()

router.get('/get-me', (req, res, next) => {
  console.log('/get-me req.user : ', req.user)
  res.send({ success: true, body: req.user, token: req.token })
})
router.all('*', function (req, res, next) {
  next(createError(404, 'apiMember ... 그런 api 없어'))
})
module.exports = router
