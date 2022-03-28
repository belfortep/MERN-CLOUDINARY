import express from 'express'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.routes.js'
import { connectDB } from './db.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true,  //no guardes en memoria, guarda en una carpeta
    tempFileDir: './upload' //donde se guarda
}))
dotenv.config()
connectDB()

app.use('/', postRoutes)


app.listen(4000)
console.log('server on port 4000')
