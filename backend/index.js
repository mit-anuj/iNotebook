const express = require('express')
const app = express();
const connectToDB = require('./db.js')

//* this will connect to the database.
connectToDB();
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

app.use('/api/users',require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))


app.listen(3000,()=>{
    console.log("listening on port 3000...");
})
