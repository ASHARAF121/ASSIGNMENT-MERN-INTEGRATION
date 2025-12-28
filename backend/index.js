require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const port = 3000

app.use(express.json())
app.use(cors('*'))

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crm').then(()=>{
    console.log('connected to mongoDB')
}).catch(()=>{
    console.log('failed to connect to mongoDB')
})

const crmRoutes = require('./routes/crm-routes')
app.use('/crm',crmRoutes)

// app.get('/',(req,res)=>{
//     res.send('welcome to crm api')
// })

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})