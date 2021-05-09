const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const crypto = require('crypto')

const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
const User = require('../../models/users')
const request = require('request')

const jwtCfg = {
  secretKey: '아무도모르는서버키',
  issuer: 'MALRANG',
  algorithm: 'HS256',
  subject: 'MALRANG',
  expiresIn: 60 * 10 * 3, // 기본 30분
  expiresInRemember: 60 * 60 * 24 * 6, // 기억하기 눌렀을 때 6일
}

const makeToken = (_id, id, lv, name) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: jwtCfg.jwt.issuer,
      subject: jwtCfg.jwt.subject,
      expiresIn: jwtCfg.jwt.expiresIn, // 기본 30분
      algorithm: jwtCfg.jwt.algorithm
    }
    jwt.sign({ _id, id, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

router.post('/in', (req, res) => {
  const { id, pwd } = req.body
  User.findOne({ id })
    .then((result) => {
      if (!result) throw new Error('아이디가 없어요')
      const p = '비밀번호 단방향 암호화 확인'
      if (result.pwd !== p) throw new Error('잘못된 비밀번호에요')

      // 토큰을 얻자
      return makeToken(result._id, result.id, result.lv, result.name)
    })
    .then((result) => {
      res.send({ success: true, body: result })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
})


module.exports = router


// Authorization: <type> <credentials></credentials>

const axios = require('axios');
const token = 'Bearer ' + '위에서전달받은토큰'
axios({
  method: 'get',
  url: '/board/blog/12345',
  headers: { 'Authorization': token }
});