// In here we're going to set up and define the authentication middleware.

const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) =>{
    // validate the user
    try{
           const token = req.header('Authorization').replace('Bearer ', '') 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)  // to ensure token is valid

       // this is going to do is find a user with the correct I.D. who has that authentication token still stored
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
          
        //there's no need for the route handlers to have to fetch the user again
           // We can actually add a property onto request to store this.
              //And the route handlers will be able to access it
        req.token = token // storing the token variable from up above.
        req.user = user  // storing the user variable from up above.

        // It's our job to call next(),if the next thing in the chain should run
        next()

    }catch(e){
        res.status(401).send({error:'Please authenticate..'})
    }
}

module.exports = auth