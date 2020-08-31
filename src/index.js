const app = require('./app')

const port = process.env.PORT      // in order to get our app working on Heroku.

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
