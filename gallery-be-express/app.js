const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const http = require('http')
const apiRouter = require('./routes/index.js')
const history = require('connect-history-api-fallback')

const app = express()

if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = http.createServer(app)

app.use('/api', apiRouter)
app.use(history())
app.use(express.static(path.join(__dirname, 'static')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send({ msg: err.message })
  console.error(err.message)
})

const debug = require('debug')('be:server')
const { onError, port } = require('./util/common')
console.log('port : ', port)

app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
})
