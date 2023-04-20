const mongoose  = require('mongoose');
const dbURL = 'mongodb://127.0.0.1:27017/inotebook'

const connectToDB = async ()=>{
    try{
        await mongoose.connect(dbURL)
        console.log("connected to database")
    }
    catch(err){
        console.log(`error connecting to database`)
    }
}

module.exports = connectToDB;