const express = require('express')
const app = express();
const connectToDB = require('./db.js')
const cors =require('cors')
// react will be connecting on the 3000 port so we will be using 5000 for express.
const port = 5000;

//* this will connect to the database.
connectToDB();
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use(cors())

app.use('/api/notes',require('./routes/notes.js'))
app.use('/api/auth', require('./routes/auth'))


app.listen(port,()=>{
    console.log(`listening on port ${port}...`);
})
