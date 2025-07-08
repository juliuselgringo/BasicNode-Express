require('dotenv').config()

let express = require('express');
let app = express();

app.use(function middleware(req, res, next){
    const response = req.method + " " + req.path + " - " + req.ip;
    console.log(response);
    next();
})

app.get(
    '/now', 
    (req,res,next) => {
        req.time = new Date().toString();
        next();
    },
    (req,res) => {
        res.send({time:req.time});
    }
)

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'))

app.get("/json", (req,res) => {
    response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase"){
        response = response.toUpperCase();
    }
    else{
        response = "hello json";
    }
    res.json({"message": response});
})



//lancer le serveur : (powershell)>node --watch server.js 
// /ou/               (bash)> npm run start
// localhost:3000





























 module.exports = app;
