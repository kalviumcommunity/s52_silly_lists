const express = require('express')

const dataModel = require('./dataModel')

const router = express.Router()

router.use(express.json());

router.get('/',(req,res)=>{
    res.send("<h1>whoohooo Server is running!!!</h1>")
})

router.get('/get-data',async (req,res)=>{
  try{
    const data = await dataModel.find({})
    res.status(200).json(data)
  }catch(error){
    res.status(400).json(error.message)
  }
})

router.post('/create-data',async (req,res)=>{
    if(!req.body){
        return res.status(204).send('No request body found')
    }
    try{
    const {title,content} = req.body
      const data = await dataModel.create({title,content})
      return res.status(200).json(data)
    }catch(error){
    return res.status(400).json(error.message)
    }
  })


router.delete('/delete-data/:id',async (req,res)=>{
    try{
      const data = await dataModel.findByIdAndDelete({_id:req.params.id})
      res.status(200).json(data)
    }catch(error){
      res.status(400).json(error.message)
    }
  })

router.put('/update-data/:id',async (req,res)=>{
    if(!req.body){
        return res.status(204).send('No request body found')
    }
    try{
        const {title,content} = req.body
      const data = await dataModel.findByIdAndUpdate(req.params.id,{title,content})
      res.status(200).json(data)
    }catch(error){
      res.status(400).json(error.message)
    }
  })

module.exports = router