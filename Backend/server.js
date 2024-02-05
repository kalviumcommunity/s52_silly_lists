const express = require('express')
const mongoose = require('mongoose')

const router = require('./router')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(async (req, res, next) => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connected")
        next()
    }catch(error){
        console.log("DB connection failed")
    } 
})

app.use(router)

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})