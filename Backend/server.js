const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const cookiParser = require('cookie-parser')
const router = require('./router')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookiParser())


const allowedOrigins = ['https://listy-lists.netlify.app', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let message = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use(async (req, res, next) => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")
        next()
    }catch(error){
        console.log("DB connection failed")
    } 
})

app.use(router)



app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})