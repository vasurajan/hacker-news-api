const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
process.setMaxListeners(Infinity);

router.post('/users', async (req, res) => {   //signup

    // Creating an instance of the User model
    const user = new User(req.body)

    try {
        await user.save()    // to save the user
       const token = await user.generateAuthToken()
        res.status(201).send({ user, token })   // shorthand syntax to define both properties.(user:user, token:token)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) =>{        //login

    try{
        // Creating a separate function to match the user's credentials(from the whole User collection)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // we're trying to generate a token for a very specific user.
        const token = await user.generateAuthToken()
        res.send({user: user, token: token})
    } catch(e){
            res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) =>{
      try{
          req.user.tokens = req.user.tokens.filter((token) =>{
              return token.token != req.token
          })
          await req.user.save()

          res.send()

      }catch(e){
                 res.status(500).send()
      }
})

router.post('/users/logoutAll', auth, async (req,res) =>{
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()

    }catch(e){
               res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)

})



// The patch HTTP method is designed for updating an existing resource
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
               //const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
       await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;