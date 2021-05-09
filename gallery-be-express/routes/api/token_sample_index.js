const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const moment = require('moment')
const jwt = require('jsonwebtoken');
const cfg = require('../../../config')



const jwtCfg = {
  secretKey: '아무도모르는서버키',
  issuer: 'MALRANG',
  algorithm: 'HS256',
  subject: 'MALRANG',
  expiresIn: 60 * 10 * 3, // 기본 30분
  expiresInRemember: 60 * 60 * 24 * 6, // 기억하기 눌렀을 때 6일
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtCfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

const getToken = async (token) => {
  let vt = await verifyToken(token)
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }
}

router.all('*', function (req, res, next) {
  const token = req.headers.authorization // 사용자 요청 해더
  getToken(token) // 토큰 검사
    .then((returnObj) => {
      req.user = returnObj.user
      req.token = returnObj.token
      next()
    })
    .catch(e => next(createError(401, e.message)))
})

router.use('/siteInfo', require('./apiSite.js'))
router.use('/board', require('./apiBoard.js'))
router.use('/sign', require('./apiSign.js'))
router.use('/download', require('./apiDownload.js'))
router.use('/demo', require('./apiDemo.js'))
router.use('/study', require('./study/apiSimplePaint'))

router.use('/pageAuth', require('./apiPage.js'))
router.use('/article', require('./apiArticle.js'))
router.use('/manage', require('./manage'))
router.use('/file', require('./apiFile.js'))
router.use('/link', require('./apiLink.js'))


router.all('*', function (req, res, next) {
  // 또 검사해도 됨
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

module.exports = router