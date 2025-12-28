const express = require('express')
const Router = express.Router()
const userController = require('../controller/crm-controller')
// const authenticate = require('../middlewares/authentication')
const checkAuth = require('../middlewares/authentication')



Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.get('/profile', checkAuth, userController.profileInfo)
Router.put('/update', checkAuth, userController.updateUserProfile)


module.exports = Router;    

