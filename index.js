require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error)=>{ // database.on means it will connect to the database
    console.log(error);
})
database.once('connected', ()=>{ // database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.
    console.log('database connected');
})

const app = express();

app.use(express.json());
// let's also use thi routes 
app.use('/api', routes);

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})