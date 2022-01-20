const express=require("express")
const app=express();
const morgan=require('morgan');
const cors=require('cors');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');

const checkAuth = require("./middlewares/check-auth");


mongoose.connect('mongodb://127.0.0.1/videoServer',{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise=global.Promise;



app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// we dont have a route like/api/videos so we will make that upload 
// folder publicly availible for that we will use express.static

app.use('/api/videos', express.static('media/uploads'));

//Routes
app.use('/api/signUp', require('./router/signUp'));
app.use('/api/signIn',require('./router/signIn'));
// for protecting the routes
//whenevr a user uploads a video it will 
// check that whether a token is present or not...
// if its not then error will be there
app.use('/api/upload', checkAuth, require('./router/upload'));
app.use('/api/videoList', checkAuth, require('./router/videoList'));



module.exports=app;