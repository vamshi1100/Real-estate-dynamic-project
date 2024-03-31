const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/user')
const Admin = require('./models/admin')

mongoose.connect('mongodb://localhost:27017/realestate', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("oh no mongo connection error")
        console.log(err)
    })
    
    
    // admin saving code to data base


    const username = 'vkv';
    const plainPassword = 'vkv1463';
    
    bcrypt.hash(plainPassword, 12, async (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return;
        }
    
        try {
            const admin = new Admin({ username, password: hash });
            await admin.save();
            console.log("Admin saved successfully");
        } catch (error) {
            console.error("Error saving admin:", error);
        }
    });
    



// const userdetails = [
//     {
//         username: 'vamshi',
//         password: 'vamshi1463',
//         phoneno: 636226,
//         email: 'vamshireddy@gmail.com'
//     },
//     {
//         username: 'bharath',
//         password: 'bharath1463',
//         phoneno: 636226,
//         email: 'bharath@gmail.com'
//     }
// ]

// User.insertMany(userdetails)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })






