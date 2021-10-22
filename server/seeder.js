import connectDB from './config/db.js'
// import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './modelUsers/userModel.js'
import Product from './modelUsers/productModel.js'
import Order from './modelUsers/orderModel.js'
import asyncHandler from 'express-async-handler'

dotenv.config()

connectDB()

const importData = asyncHandler(async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts =  products.map(product => {
            return ({ ...product, user: adminUser })
        })


        await Product.insertMany(sampleProducts)

        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
})

// const productData = async () => {
//     try {
//         await Order.deleteMany()
//         await Product.deleteMany()
//         await User.deleteMany()

//         const createdProducts = await Product.insertMany(products)

//         const ProductUsers = createdProducts[0]._id

//         const sampleUsers =  users.map(user => {
//             return ({ ...user, products: ProductUsers })
//         })


//         await User.insertMany(sampleUsers)

//         console.log('Data Imported');
//         process.exit()
//     } catch (error) {
//         console.log(error.message);
//         process.exit(1)
//     }
// }



const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed');
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else if(process.argv[2] === '-p') {
    productData
} else {
    importData()
}

