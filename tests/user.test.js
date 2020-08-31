const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user')

//jest methods
const userOne = {   
    // All of the data we need to create this test user.
    name: 'Vaulstein',
    email: 'vaulstein@example.com',
    password: 'SoalMumbai'
}

// Every time our test suite runs the environment should be recreated 
   // like deleting everything in the database

//This makes sure that the users are deleted before the test runs
beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()   // creating a new user by passing userOne object and saving in database
})

test('Should signup a new user', async () => {
    // using await to make sure that the request actually finishes before jest figures out if it's a success or a failure.
    await request(app).post('/users').send({ 
        name: 'Vasu',
        email: 'vasu@example.com',
        password: 'MyPass777'
    }).expect(201)    // we're expecting 201 if things went well
})


test('Should login existing user', async () => {
    // using the end-point that requires login
    await request(app).post('/users/login').send({
        email: userOne.email,    // referencing the email and password on the "userOne" object up above
        password: userOne.password
    }).expect(200)
})


// test case that makes sure when the credentials are wrong, error must be given
test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

