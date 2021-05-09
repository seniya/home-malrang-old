const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const crypto = require('crypto')

const jwt = require('jsonwebtoken')
const cfg = require('../../config')
const db = require('../../util/db')

const signToken = (id, email, lv, name) => {
  // console.log('signToken id, email, lv, name : ', id, email, lv, name)

  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresInRemember, // 6일
      algorithm: cfg.jwt.algorithm
    }
    jwt.sign({ id, email, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      // console.log('signToken err : ', err)
      // console.log('signToken token : ', token)
      if (err) reject(err)
      resolve(token)
    })
  })
}

router.post('/in', async (req, res) => {
  const { email, password } = req.body
  console.log('email, password : ', email, password)
  if (!email) throw createError(400, '아이디가 없습니다')
  if (!password) throw createError(400, '비밀번호가 없습니다')

  const user = db.getUser(email)
  if (!user) throw new Error('존재하지 않는 아이디입니다.')
  const p = crypto.scryptSync(password, email.toString(), 64, { N: 1024 }).toString('hex')
  if (user.password !== p) throw new Error('비밀번호가 틀립니다.')
  console.log('user.password === p : ', user.password === p)
  try {
    const r = await signToken(user.id, user.email, user.lv, user.name)
    res.send({ success: true, body: r })
  } catch (error) {
    res.send({ success: false, msg: error.message })
  }
})

router.post('/out', (req, res) => {
  res.send({ success: false, msg: '아직 준비 안됨' })
})

router.post('*', (req, res, next) => {
  next(createError(404, '그런 api 없어'))
})

module.exports = router
