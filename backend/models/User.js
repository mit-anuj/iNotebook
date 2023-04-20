const mongoose  = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
        // removed the unique attribute form here beacuse we are checking it in auth.js file.
    },
    password: {
        type : String,
        required: true
    },
    date: {
        type : Date,
        default :  Date.now
    }

})
const user = mongoose.model('user',userSchema)
module.exports = user