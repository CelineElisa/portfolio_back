require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./src/routes/index')
const { port } = require('./src/helper/service')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(cors({
    exposedHeaders: ['Content-Range', 'X-Total-Count']
  }))

app.use('/api/projects', routes.Projects)
app.use('/api/profile', routes.Profile)
app.use('/api/Screenshots', routes.Screenshots)

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad just happened...')
  }
  console.log(`Server is listening on ${port}`)
})
