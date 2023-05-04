const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const initDatabase = require('./database/initDatabase');
const app = express()
//----------middleware---------
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//----------middleware---------

//---------database Connection-------

initDatabase()

//---------database Connection-------

//--------- router --------------
const userRouter = require("./router/userRouter")
app.use("/user",userRouter)

//---------- router -------------

app.get('/',function(req,res){
  res.send('Hello World!');
})

app.listen(3000,function() {
    console.log('Server listening on port')
})