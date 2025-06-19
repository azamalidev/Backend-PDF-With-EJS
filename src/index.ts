import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (req: any, res: any) => {
  return res.send('Express Typescript on Vercel')
})

app.get('/ping', (req: any, res: any) => {
  return res.send('pong 🏓')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})