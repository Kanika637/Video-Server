const jwt= require('jsonwebtoken')

const key= require('../configs/default').secret_key;

module.exports=(req,res,next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        
        // console.log('CHECK SUCCESSFULL: Your token: '+ token);
        // checking the validity of token
        const decoded=jwt.verify(token,key);
        // we will dicode the data and store it in request body by the name userData
        req.userData=decoded;
        next();
    }catch(error){
        // 401: unauthanticated

        return res.status(401).json({
            message:"Auth failed"
        });
    }
}