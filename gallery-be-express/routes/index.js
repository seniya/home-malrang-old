const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cfg = require('../config')

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 5 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 5 })
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) resolve({ id: 'guest', name: '손님', lv: 5 })
      resolve(v)
    })
  })
}

const signToken = (id, email, lv, name, expSec) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      algorithm: cfg.jwt.algorithm,
      expiresIn: cfg.jwt.expiresInRemember
    }
    jwt.sign({ id, email, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const getToken = async (t) => {
  const vt = await verifyToken(t)
  if (vt.lv > 3) return { user: vt, token: null }
  const nt = await signToken(vt.id, vt.email, vt.lv, vt.name)
  // console.log('getToken nt : ', nt)
  // console.log('getToken vt : ', vt)
  return { user: vt, token: nt }
}

// router.use('/test', require('./api/apiTest'))
router.use('/sign', require('./api/apiSign'))

router.all('*', function (req, res, next) {
  getToken(req.headers.authorization) // 토큰 검사
    .then((v) => {
      console.log('getToken', v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => next(createError(401, e.message)))
})

router.use('/member', require('./api/apiMember'))
router.use('/file', require('./api/apifile'))

module.exports = router
