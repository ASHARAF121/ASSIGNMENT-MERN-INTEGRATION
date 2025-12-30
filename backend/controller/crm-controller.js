require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey;
const {createNewUser,getUserById,updateUserById,authenticateUser} = require('../db-helpers/userHelper');


exports.register = async(req,res)=>{
    try{
        const {username,password,role} = req.body
        const newUser = await createNewUser({username,password,role})
        res.status(201).json(newUser)



    }catch(err){
        res.status(500).json({message:'error registering user'})

    }

}

exports.login = async(req,res)=>{
    const {username,password} = req.body
   
    const user = await authenticateUser(username,password)
    if(!user){
        res.status(401).send('invalid credentials')

    }
    const token = jwt.sign({userId:user.id,username:user.username},secretKey,{expiresIn:'1hr'});
    res.json({message:'logged in',token})

}

exports.profileInfo = async(req,res)=>{
    try {
        const {username,role} = req.user;
        req.user = {username:username,role:role}    
        res.json({message:'user profile info',user:req.user})
    } catch (error) {
        res.status(500).json({message:'error finding user'})
        
    }
}

exports.updateUserProfile = async(req,res)=>{
    try {
        const{username,password,role}     = req.body
        await updateUserById(req.user.userId,{username,password,role})
        res.json({message:'user has been updated'})
    } catch (error) {
        res.status(500).send('Error upating user')
        
    }
}