const mongoose  = require('mongoose');
const dbURL = 'mongodb://127.0.0.1:27017/'

const connectToDB = ()=>{
    mongoose.connect(dbURL)
    .then(()=>{
        console.log("connected to database")
    })
    .catch(err=>{   
        console.log("error connecting")})
}

module.exports = connectToDB;