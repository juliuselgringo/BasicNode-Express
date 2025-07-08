require('dotenv').config()

let express = require('express');
let app = express();
// app.get pour GET //app.post pour POST

/**
 * on affiche des infos dans la console du serveur
 */
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

/**
 * A la racine on affiche index.html
 */
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

/**
 * ici permet d'appliquer le style.css contenu dans /public
 */
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

/**
* récupérer des données de l'utilisateur
* pour tester: utiliser localhost:3000/cplusclair/echo
* la page affichera le json: {"echo": "cplusclair"}
*/
app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({echo : word});
})



//lancer le serveur : (powershell)>node --watch server.js 
// /ou/               (bash)> npm run start
// localhost:3000





























 module.exports = app;
