const mongoose  = require('mongoose');
const dbURL = 'mongodb://127.0.0.1:27017/iNotebook'

const connectToDB = async ()=>{
    try{
        await mongoose.connect(dbURL)
        console.log("connected to database")
    }
    catch(err){
        console.log(`error connecting to database`)
    }
    

    // .then(()=>{
    //     console.log("connected to database")
    // })
    // .catch(err=>{   
    //     console.log("error connecting")})
}

module.exports = connectToDB;