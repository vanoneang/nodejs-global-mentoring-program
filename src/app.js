import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import winston from 'winston'
import expressWinston from 'express-winston';

import apis from './api'
import jwt from './middleware/jwt'
import errorHandler from './middleware/exception'

const app = express()
const port = process.env.PORT || 3000

app.set('x-powered-by', false)
app.set('case sensitive routing', true)
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use(jwt())


app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

app.use(apis)

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

app.use(errorHandler)


app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`App listening at http://localhost:${port}`)
})
