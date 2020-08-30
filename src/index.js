const express = require('express')
require('./db/mongoose')  // just to ensure that the file runs and it's going to ensure that Mongoose connects to the database.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
// const dotenv = require('../config/dev.env')
// dotenv.config()

const app = express()
const port = process.env.PORT      // in order to get our app working on Heroku.

app.use(express.json())

// After creating router, we have to register it to work with our express application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
