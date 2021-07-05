import app from './app'

const port = process.env.PORT || 3000

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`App listening at http://localhost:${port}`)
})
