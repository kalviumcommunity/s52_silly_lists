const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const PORT = 3000

app.get('/',async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        res.status(200).send('<h1>DB Connected</h1>')
    }catch(error){
        res.status(400).send('<h1>DB Connection Failed</h1>')
    }
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})