const mongoose = require('mongoose')
// const validator = require('validator')

//To connect to the database
    // with URL and options object
mongoose.connect(process.env.MONGODB_URL, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, autoIndex: true })
