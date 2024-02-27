const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const cookiParser = require('cookie-parser')
const router = require('./router')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookiParser())

app.use(cors({ origin: ['http://localhost:5173','https://listy-lists.netlify.app/'], credentials: true }));

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