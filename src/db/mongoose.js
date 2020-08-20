const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, autoIndex: true })

// const User = mongoose.model('User',{
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//          type: String,
//          trim: true,
//          required: true,
//          validate(value){
//              if(!validator.isEmail(value)){
//                  throw new Error('Email is Invalid')
//              }
//          }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//            if(value.toLowerCase().includes('password')){
//                throw new Error('Password cannot contain "password"')
//            }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value){
//             if(value < 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// const vasu = new User({
//     name: '  Vasu   ',
//     email: 'vasurajan181@gmail.com',
//     password: '      chamari8685       '
// })

// vasu.save().then((result) =>{
//     console.log(result)
// }).catch((error) =>{
//     console.log(error)
// })


// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: "Eat Lunch"
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })