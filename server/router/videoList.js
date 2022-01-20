const express=require('express')

const router=express.Router();

const videoDetails=require("../models/VideoDetails")

//here the user will request for the video 
// from the server
router.get('/',(req,res,next)=>{
    console.log('Got Request')
    videoDetails
    .find()
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});

module.exports=router;