import User from '../modelUsers/userModel.js'
import asyncHandler from 'express-async-handler'
import userToken from '../userToken.js'

// GET USER
export const authUser =asyncHandler(async (req, res) => {
       const {email, password} = req.body
       
       const user = await User.findOne({email})
       console.log(user)

       if(user && (await user.matchPassword(password))) {
              res.json({
                     _id: user._id,
                     name: user.name,
                     email: user.email,
                     isAdmin: user.isAdmin,
                     token: userToken(user._id)
              })
       } else {
              res.status(401)
              throw new Error('Invalid email or password')
       }
   
})

// CREATE USER
export const registerUser = asyncHandler(async (req, res) => {
       const {name, email, password} = req.body
       
       const userExists = await User.findOne({email})
     if(userExists) {
            res.status(400)
            throw new Error('User already exists')
     }

     const user = await User.create({
            name,
            email,
            password
     })
     if(user) {
       res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: userToken(user._id)
       })
     } else {
       res.status(400)
       throw new Error('Invalid user data')
     }
   
})




// Get USER PROFILE
export const getUserProfile =asyncHandler(async (req, res) => {
       
     const user = await User.findById(req.user._id)
       
     if(user) {
       res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
       })
     }else {
            res.status(404)
            throw new Error('User not found')
     }
})

// UPDATE USER PROFILE
export const updateUserProfile = asyncHandler(async (req, res) => {
       
       const user = await User.findById(req.user._id)
         
       if(user) {
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         if(req.body.password) {
                user.password = req.body.password
         }

         const updatedUser = await user.save()
         console.log(updatedUser);
         res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              token: userToken(updatedUser._id)
       })
       }else {
              res.status(404)
              throw new Error('User not found')
       }
  })
  

// Get ALL USER
export const getUsers = asyncHandler(async (req, res) => {
       
       const users = await User.find({})
         
         res.json(users)
  })

//   DELETE USER
export const deleteUser = asyncHandler(async (req, res) => {
       
       const user = await User.findById(req.params.id)
         
       if(user) {
              await user.remove()
              res.json({ message: ' User Removed'})
       } else {
              res.status(404)
              throw new Error('User not found')
       }
  })
  
//   GET USER BY ID
  export const getUserById = asyncHandler(async (req, res) => {
       
       const user = await User.findById(req.params.id).select('-password')
       if(user) {
        res.json(user)
       } else {
              res.status(404)
              throw new Error('User not found')
       }
  })

//   UPDATE USER

  export const updateUser = asyncHandler(async (req, res) => {
       
       const user = await User.findById(req.params.id)
         
       if(user) {
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         user.isAdmin = req.body.isAdmin || user.isAdmin

         const updatedUser = await user.save()
         console.log(updatedUser);
         res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin
       })
       }else {
              res.status(404)
              throw new Error('User not found')
       }
  })