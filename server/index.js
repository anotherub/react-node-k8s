const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const keys = require('./keys')
const redis = require('redis')
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})
redisClient.set('views', 0)
redisClient.on('connect', () => {
  console.log('Connected to redis service successfully')
})
redisClient.on('error', function (error) {
  console.error(error)
})

app.get('/views', (req, res) => {
  console.log('Enter path', req.path)
  redisClient.get('views', (err, views) => {
    const totalviews = parseInt(views) + 1
    redisClient.set('views', totalviews)
    return res.send(totalviews.toString())
  })
})

app.listen(3001, () => {
  console.log('server is runnig on port:3001')
})
