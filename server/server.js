import path from 'path'
import express from "express";
import connectDB from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import apiRoute from './usersRoute/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import orderRoutes from './usersRoute/orderRoutes.js'
import usersRoute from './usersRoute/usersRouter.js'
import uploadRoutes from './usersRoute/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Middleware
app.use(express.json({
    limit: '30mb',
    extended: true
}))

app.use(express.urlencoded({
    limit: '30mb',
    extended: true
}))

app.use(cors())

// ROutes
app.use('/', apiRoute)
app.use('/api/users', usersRoute)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '.client/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} 


app.use(notFound)

app.use(errorHandler)

// ROutes


app.use('/users', usersRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
})
    