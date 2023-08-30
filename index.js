const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const applyMidleware = require('./middlewares/middlewares');
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()
//----------middleware---------
applyMidleware(app)

//--------- router --------------


app.get('/',async(req,res)=>{
  const alluers = await prisma.user.findMany()
  res.json(alluers)
})

app.post('/',async(req,res)=>{
  const newData = await prisma.user.create({
    data : req.body
  })
  res.json(newData)

  const createMany = await prisma.user.createMany({
    data: [
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
      { name: 'Yewande', email: 'yewande@prisma.io' },
      { name: 'Angelique', email: 'angelique@prisma.io' },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  })
})

//error handler
errorHandler(app)

app.listen(3000,function() {
    console.log('Server listening on port')
})