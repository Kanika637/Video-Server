const express=require('express')
const router=express.Router();
//encrypt the  password and check it with the password that is entered before during signup
const bcrypt=require('bcrypt');

//when the user signIn we will create a token 
// from server side and send it to the user
const jwt=require('jsonwebtoken');

const User=require('../models/User');

router.post('/', (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            //no user found
            return res.status(401).json({
                message:"Auth Failed"
            });
        }
        //comparing the password because we found the user
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Auth Failed"
                });
            }
            if(result){
                // I think creating tokens here
                const token= jwt.sign({
                    userId:user[0]._id,
                    firstName:user[0].firstName,
                    lastName:user[0].lastName,
                    email:user[0].email
                }, require('../configs/default').secret_key,{
                    expiresIn:'1h'
                
                });
            //password found matching we will generate tokens later

                return res.status(200).json({
                    message:"Auth successful",
                    // attach a token on sucess
                    token: token
                });
            }
            res.status(401).json({
                message:"Auth failed"
            });
        });

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports=router;