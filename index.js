const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})

const users = [
    {
        id: 1,
        firstname: "Qudus",
        lastname: "Adedokun",
        occupation: "Jobless",
        age: 18
    },
    {
        id: 2,
        firstname: "Qudus",
        lastname: "Zubair",
        occupation: "Retired",
        age: 22
    },
    {
        id: 3,
        firstname: "Adedeji",
        lastname: "Aminah",
        occupation: "Doctor",
        age: 5
    }
]

app.get('/customer/:id', (req, res) => {
    const userid = req.params.id
    const userData = users.find((user) => user.id == userid)
    if (!userData) {
        res.status(404).send({
            message: 'User not found'
        })
    } else {
        res.status(200).send({
            message: 'User data fetched',
            data: userData
        })
    }
})

app.get('/customers', (req, res) => {
    res.status(200).send({
        message: "All customers fetched",
        data: users
    })
})

app.post('/customer', (req, res) => {
    const fname = req.body.firstname
    const lname = req.body.lastname
    const work = req.body.occupation
    const age = req.body.age

    if(!fname || !lname || !work || !age){
        res.status(400).send({
            message: "Please fill all fields"
        })
    } else {
        const newUser = {
            id: users.length + 1,
            firstname: fname,
            lastname: lname,
            occupation: work,
            age: age
        }

        users.push(newUser)

        res.status(201).send({
            message: "Customer created successfully",
            data: newUser
        })
    }
})