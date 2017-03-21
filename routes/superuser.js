// ***** fichier index.js
// ***** chargement des modules
 
_super = (request, response) => { // @ retourne la date formatée
    var express = require('express')
    var app = express()
    //var router = express.Router();
    console.log("super")
    var bodyParser = require('body-parser')// body-parser, formate le request d'un form
    app.use(bodyParser.json()) // pour format json
    var multer = require('multer') // req.body récupère les champs d'un form
    var upload = multer()
    app.use(bodyParser.json()) //parsing application json
    app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded
 
    console.log('superuser alone.js')
 
    var _fonctions = require('../nodules/fonctions') // fonctions
    //var theDate = myDate()
 
        var info = new Object()
        info.menu = 'superuser'
        info.page = 'superuser'   
        info.date = myDate()
 
    //console.log(theDate)
 
        var tbl = new Object()
    final = 0
    // @ lecture fichier documentation
    tbl.a = readFile("./package.json", (data)=>{
        tbl.a = _decryptJson(data) + '<br>'
        //tbl.a = decryptJson(data) + '<br>'
        if (++final == 5) finalisation(response, info, tbl)
    })
    tbl.b = readFile("app.js", (data)=>{
        tbl.b = decryptCode(data)+ '<br>'
        if (++final == 5) finalisation(response, info, tbl)
        //if (final == 3) response.render(info.page, { info })
    })
    // @ lecture fichier index
    tbl.c = readFile("./routes/index.js", (data)=>{
        tbl.c = decryptCode(data)+ '<br>'
        if (++final == 5) finalisation(response, info, tbl)
    })
    tbl.d = readFile("./nodules/read_file.js", (data)=>{
        tbl.d = decryptCode(data)+ '<br>'
        if (++final == 5) finalisation(response, info, tbl)
        //if (final == 3) response.render(info.page, { info })
    })
    tbl.e = readFile("./nodules/map.js", (data)=>{
        tbl.e = decryptCode(data)+ '<br>'
        if (++final == 5) finalisation(response, info, tbl)
        //if (final == 3) response.render(info.page, { info })
    })
 
 
    //_fonctions.verif()
 
    //response.render(info.page, { info })
 
//    info.date = _fonctions.myDate()
}
 
 
module.exports = (_super)
