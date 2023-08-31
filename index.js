const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const applyMidleware = require('./middlewares/middlewares');
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

const app = express()
//----------middleware---------
applyMidleware(app)

//--------- router --------------


app.get('/',async(req,res)=>{
  try {
    const alluers = await prisma.user.findMany()
    res.json(alluers)
  } catch (error) {
    res.json({
      error : error.message
    })
  }
})

app.post('/user/',async(req,res)=>{
  try {
    const {password} = req.body

    const hashed = await bcrypt.hash(password , 10)

    const user = await prisma.user.create({
      data : {
        ...req.body,
        password : hashed,
        image : '/image/users/user_default.png'
      }
    })

    res.json(user)
  
  } catch (error) {
    res.json({
      error : error.message
    })
  }

})

app.put('/:id',async(req, res)=>{
  try {
    const updateData = await prisma.user.update({
      where: {
        id : parseInt(req.params.id)
      },
      data : {
        name : req.body.name,
        email : req.body.email
      }
    })
    res.json(updateData)
  } catch (error) {
    res.json({
      error : error.message
    })
  }
})

app.get('/contact/:id',async(req,res)=>{
  try {
    const contacts = await prisma.contact.findMany({
      where : {
        authorId : req.params.id
      },
      include : {
        author : true
      }
    })

    res.json(contacts)
  
  } catch (error) {
    res.json({
      error : error.message
    })
  }

})

app.post('/contact/',async(req,res)=>{
  try {
    const user = await prisma.contact.create({
      data : {
        ...req.body,
        image : '/image/users/user_default.png'
      }
    })

    res.json(user)
  
  } catch (error) {
    res.json({
      error : error.message
    })
  }

})

//error handler
errorHandler(app)

app.listen(3000,function() {
    console.log('Server listening on port')
})