import express from 'express'
import cookieParser from 'cookie-parser'

import apis from './api'
import errorHandler from './middleware/exception'

const app = express()
const port = process.env.PORT || 3000

app.set('x-powered-by', false)
app.set('case sensitive routing', true)

app.use(express.json())
app.use(cookieParser())
app.use(apis)

app.use(errorHandler())


app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`App listening at http://localhost:${port}`)
})