const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,  //DATA stored is going to be object id
        required: true,
        ref: 'User'             //It allows us to create a ref which is short for reference from this field to another model.
    }
}, {
    timestamps: true
})

// Creating a model for News
const Task = mongoose.model('Task', taskSchema)

module.exports = Task