const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const multer = require('multer')
const path = require('path')

// function weekOfMonth(m) {
//   return m.week() - moment(m).startOf('month').week() + 1
// }

// function strWeekOfMonth() {
//   const nowDate = moment(new Date())
//   return nowDate.format('YYYY_MM_') + weekOfMonth(nowDate)
// }
// const dest = path.join(__dirname, '../../../upload/', strWeekOfMonth())
const dest = path.join(__dirname, '../../upload/')

const multerObj = multer({ dest })

router.post('/upload', multerObj.array('uploadFiles', 10), function (req, res, next) {
  // req.files 는 `photos` 라는 파일정보를 배열로 가지고 있습니다.
  // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
  console.log('/upload', req.files)

  res.send({ success: true, body: 'gg', token: req.token })
})

router.all('*', function (req, res, next) {
  next(createError(404, 'apiMember ... 그런 api 없어'))
})
module.exports = router
