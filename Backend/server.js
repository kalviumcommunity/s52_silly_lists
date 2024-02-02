const express = require('express')

const app = express()
const PORT = 3000

app.get('/ping',(req,res)=>{
    res.send('<h1>On ping route</h1>')
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})