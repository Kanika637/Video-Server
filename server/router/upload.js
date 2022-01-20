const express=require('express');
const router=express.Router();
// for storing the video files in our local system we will use multer
// multer is a nodejs middle ware which is used for uploading files
const multer=require('multer');
const port= require('../configs/default').port;


const thumbnailGenerator=require('../helpers/videoThumbnail')

const storage= multer.diskStorage({
    destination: (req,res,cb)=>{
        // these are folder names where file swill be stored
        cb(null, 'media/uploads');
    },
    // originalname will be passed by multer automaticalyy
    filename:(req,file,cb)=>{
        // we dont want any space so replacing the spaces with '_'
        cb(null, file.originalname.replace(/ /g,'_'))
    }
});
const upload=multer({

    storage:storage,
    limits:{
        fileSize:1024 * 1024* 50 //50mb
    }
});
// this allows for uploading a single file only
router.post('/',upload.single('file'), (req, res, next)=>{
    thumbnailGenerator.generateThumbnail(
        // /api/videos is made publically available in App.js
        //this is the target
        'http://127.0.0.1:' + port + '/api/videos/' + req.file.filename.replace(/ /g, '_'),
        //this is the title 
        req.file.filename.replace(/ /g, '_'),
        //this is the username
        // userdata will be availible from the token
        req.userData.firstName);
    res.status(200).json({
        
        message:'Video uploaded successfully'
    });

});

module.exports=router;

