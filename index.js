const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const applyMidleware = require('./middlewares/middlewares');
const { PrismaClient } = require('@prisma/client')
const path = require('path')
const categories = require('./data/category.json');
const duanames = require('./data/duanames.json');
const duaAlls = require('./data/duadetails.json')

const prisma = new PrismaClient()

const app = express()

//----------middleware---------
applyMidleware(app)
app.use(express.static(path.join(__dirname, 'public')))

//--------- router --------------

app.get('/', async (req, res) => {
  try {
    const results = await prisma.category.findMany({})
    res.send(results)
  } catch (error) {
    console.log(error)
  }
})

app.get('/:id', async (req, res) => {
  try {
    const results = await prisma.chapter.findMany({
      where : {
        category_id : req.params.id
      },
      include : {
        duas : true
      }
    })
    res.send(results)
  } catch (error) {
    console.log(error)
  }
})

app.post('/category/:id', async (req, res) => {

  try {
    // const results = await prisma.category.findMany({})
    let results = []

    duanames.filter(dua => dua.category === req.params.id)

      .forEach(async (dua) => {
        const data = await prisma.chapter.create({
          data : {
            category_id : "14d54f03-83ba-4f68-a3cf-23bb0966ab46",
            name : dua.duaname,
          }
        })
        const duadetail = duaAlls.find(data => data.dua_global_id === dua.dua_global_id)
        await prisma.dua.create({
          data : {
            chapter_id : data.id,
            arabic : duadetail.arabic,
            arabic_diacless : duadetail.arabic_diacless,
            reference : duadetail.reference,
            top : duadetail.top,
            translations : duadetail.translations,
            transliteration : duadetail.transliteration,
          }
        })
      })
    res.send(results)
  } catch (error) {
    console.log(error)
  }
})





//error handler
errorHandler(app)

app.listen(3000, function () {
  console.log('Server listening on port')
})