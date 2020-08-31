const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// The first thing we need to do is define the model we're working with 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        // setting up a custom validator for a field
          // validate get set equal to a function using ES6 method definition syntax
        validate(value) {
            // Using validator npm package
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            // using the includes() method
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    // Tracking tokens.....tokens is actually going to be an array of objects.
    tokens: [{
        token: {         // each token in that tokens array will be an object with a single field called token 
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true    
})                    

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


// It's gonna get called whenever the object gets stringify
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    //hiding private data
    delete userObject.tokens   // Hiding from the object that we send back as the response.
    delete userObject.password

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this   // allowing us to access the user

// In arguments to sign(), we have to provide an object(a payload) that uniquely identifies the user.and a secret(string).
    // toString() -- to convert objectId into standard string
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

// Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to Login')
    }
    // verify the password using the compare function
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to Login')
    }
    return user
}

// pre => for doing something before an event like before validation or before saving.
  // Hash the plain text password before saving......
userSchema.pre('save', async function (next) {
    const user = this
    // We only want to hash the password if it's been modified by the user
    if (user.isModified('password')) {
        
        user.password = await bcrypt.hash(user.password, 8)  // method from the bcrypt library accepting 2 arguments
  // second argument in here is the number of rounds, which determines how many times the hashing algorithm is executed.
    // 8 was the value recommended by the original creator of the algorithm.( maintains balance b/w security and speed)
     // hashed password is the value that will end up storing in the database.
        // hasing algorithms are by design not reversible
    }

    next()   // We simply call next when we're done 
})

// What we're doing is to create a middleware that deletes the tasks of the user, when that user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })
    next()
})

// Creating a variable to store user
const User = mongoose.model('User', userSchema)

User.init()

module.exports = User