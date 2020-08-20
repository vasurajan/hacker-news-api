const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use((req,res,next) =>{
//     if(req.method === 'GET'){
//              res.send('GET method is disabled')
//     }else {
//         next()
//     }
    
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//         const token = jwt.sign({_id: 'abc123'}, 'thisismybackendproject', {expiresIn: '7 days'})
//         console.log(token)

//         const data = jwt.verify(token,'thisismybackendproject')
//         console.log(data)
// }

// myFunction()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () =>{
    //   const task = await Task.findById('5f3d2e5272c8903ff091261f')
    //   await task.populate('owner').execPopulate()  //it's going to find the user who's associated with this task
    //   console.log(task.owner)

//     const user = await User.findById('5f3d2c0d09b3fe4b60b363b7')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()