import express, { Request, Response } from "express";


const app = express()
const port = 3000


app.use(express.json());

// Return all users
app.get('/users', (req, res) => {

});

// Create a user with attributes username, password, email and fullname
app.post('/users', (req, res) => {

    console.log(req.body);
    res.send('hello')
    // use req.body
});

// Return a user with parameter id if not exists return message saying `user not found`
app.get('/users/:id', (req, res) => {

});


// update user information for given id 
app.put('/users/:id', (req, res) => {
    // req.params.id
});


// delete user for given id
app.delete('/users/:id', (req, res) => {
    // req.params.id
});



app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`)
})