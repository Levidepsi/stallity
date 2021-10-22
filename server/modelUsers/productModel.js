import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const reviewSchema =  mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User  '
    },
}, { timestamps: true })


const productModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User  '
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },

    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })


// userModel.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// userModel.pre('save', async function(next) {
//     if(!this.isModified('password')) {
//         next()
//     }

//     const salt = await bcrypt.genSaltSync(10)
//     this.password = await bcrypt.hash(this.password, salt)

// })

const Product = mongoose.model('Product', productModel)


export default Product