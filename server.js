const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env= require('dotenv');
var cookieParser = require('cookie-parser');
//Dynamic Port for Heroku
const PORT = process.env.PORT || 2000;

//Mongoose Schema
const User = require('./models/Users');
//Route for post requests
const Routes = require('./routes/route');
env.config();

mongoose.connect(process.env.MONGODB, {useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
}, (err)=>{
    if(err) return console.log(err);
    console.log('Database connected..');
});

//UserSchema to be called from models/Users

app.use(bodyParser.json());
app.use(cookieParser());
//calls routes where post requests are made
app.use(Routes);

//heroku dynamic port
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



app.listen(PORT, ()=>{
    console.log('Connected to Port 2000');
});