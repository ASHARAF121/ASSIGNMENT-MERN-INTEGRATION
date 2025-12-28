const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey

const checkAuth = (req,res,next)=>{
    try {
        const token = req?.headers['authorization'] || req.cookies['session_token']
        if(!token){
            return res.status(401).send('unauthorised,no token provided')
        }
        const isAuth = jwt.verify(token,secretKey)
        // console.log(isAuth);
        // const {userId,username,role} = isAuth;
        // isAuth= {id:userId,username:username,role:role}
        req.user = isAuth;


        // res.json({message:'authorised user,auth user is '+authUser})
        next()
    } catch (error) {
        res.status(500).send('error from server')
    
    }
}

module.exports=checkAuth;