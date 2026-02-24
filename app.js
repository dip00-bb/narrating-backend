import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware.js'
const app = express()


app.use(cors({
    // origin:process.env.CORS_ORIGIN,
    credential: true
}))


app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import authRouter from './routes/auth.router.js'
import cloudSignature from './routes/signedUpload.router.js'
import blogRouter from './routes/blog.route.js'
import commentRouter from './routes/comment.route.js'
import { createApolloServer } from './graphql/index.js'

app.use('/api/auth/', authRouter)
app.use('/api/cloudinary',cloudSignature)
app.use('/api/blog',blogRouter)
app.use('/api/comment',commentRouter)
await createApolloServer(app)

app.use(errorHandler)
export { app }