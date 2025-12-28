const User =  require('../models/User')

exports.createNewUser = async(data)=>{
    try {
        const newUser =  new User(data)
        await  newUser.save();
        return {message:'user has been registered'}
        
    } catch (error) {

        throw new Error('error creating new user')
        
    }

}

exports.getUserById = async(userId)=>{
    try {
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        throw new Error('failed to get user')
        
    }

}


exports.updateUserById = async(updateid,updatedata)=>{
    try {
        await User.findByIdAndUpdate(updateid,updatedata);
        return {message : 'user has been updated'}
        
    } catch (error) {
        throw new Error('error updating user')
        
    }

} 

exports.authenticateUser = async(username,password,role)=>{
    try {
        
        const user = await User.findOne({username,password,role})
        console.log(user);
        if(!user){
            throw new Error('invalid cresdentials')
        }
        return user;
    } catch (error) {
       
        throw new Error('authentication')
        
    }
}

