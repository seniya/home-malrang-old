const express = require('express')
const router = express.Router()
const db = require('../../util/db')
const crypto = require('crypto')

router.get('/', (req, res) => {
  res.send({ success: true, msg: 'hello2' })
})

// get resource data
// router.get('/:id', function (req, res) {
//   console.log('request to', req.path)
//   console.log('origin', req.get('origin'))
//   console.log('db.get(req.params.id) : ', db.get(req.params.id))

//   res.json({
//     status: 'GET completed',
//     payload: {
//       [req.params.id]: db.get(req.params.id)
//     }
//   })
// })

router.get('/:id/:pwd', function (req, res) {
  const _id = req.params.id
  const _pwd = req.params.pwd

  const data = db.getUser(_id)
  console.log('data : ', data)

  const p1 = crypto.scryptSync(_pwd, _id.toString(), 64, { N: 1024 }).toString('hex')
  const p2 = data.password

  console.log('p1 : ', p1)
  console.log('p2 : ', p2)

  console.log('p1 & p2 : ', p1 === p2)

  res.send({ success: true, msg: 'p' })
})

router.post('/:id', function (req, res) {
  console.log('origin', req.get('origin'))
  // TODO: sanitize params
  const data = db.increase(req.params.id, req.body.emoji)
  res.json({
    status: 'POST completed',
    payload: {
      [req.params.id]: data
    }
  })
})

module.exports = router
