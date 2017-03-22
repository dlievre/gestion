// ***** fichier index.js
// ***** chargement des modules
 
_super = (request, response) => { // @ retourne la date formatée
    var express = require('express')
    var app = express()
    //var router = express.Router();
    var bodyParser = require('body-parser')// body-parser, formate le request d'un form
    app.use(bodyParser.json()) // pour format json
    var multer = require('multer') // req.body récupère les champs d'un form
    var upload = multer()
    app.use(bodyParser.json()) //parsing application json
    app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded
 
    console.log('superuser')
 
    var _fonctions = require('../nodules/fonctions') // fonctions
    //var theDate = myDate()
 
        var info = new Object()
        info.menu = 'superuser'
        info.page = 'superuser'   
        info.date = _myDate()
        info.text = 'text'
 
    //console.log(theDate)
 
// files = _filesDir('./routes')
// files.forEach( (file)=>{
// 	if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0)  console.log('x '+ file )
// 	})


    // var tbl = new Object()
    // final = 0
    // // @ lecture fichier documentation
    // tbl.a = _readFile("./package.json", (data)=>{
    //     tbl.a = _decryptJson(data) + '<br>'
    //     //tbl.a = decryptJson(data) + '<br>'
    //     if (++final == 5) _finalisation(response, info, tbl)
    // })
    // tbl.b = _readFile("app.js", (data)=>{
    //     tbl.b = _decryptCode(data)+ '<br>'
    //     if (++final == 5) _finalisation(response, info, tbl)
    //     //if (final == 3) response.render(info.page, { info })
    // })
    // // @ lecture fichier index
    // tbl.c = _readFile("./routes/index.js", (data)=>{
    //     tbl.c = _decryptCode(data)+ '<br>'
    //     if (++final == 5) _finalisation(response, info, tbl)
    // })
    // tbl.d = _readFile("./nodules/read_file.js", (data)=>{
    //     tbl.d = _decryptCode(data)+ '<br>'
    //     if (++final == 5) _finalisation(response, info, tbl)
    //     //if (final == 3) response.render(info.page, { info })
    // })
    // tbl.e = _readFile("./nodules/map.js", (data)=>{
    //     tbl.e = _decryptCode(data)+ '<br>'
    //     if (++final == 5) _finalisation(response, info, tbl)
    //     //if (final == 3) response.render(info.page, { info })
    // })

//var data = {};
//readFiles('../routes/') 
	var readfile = require('../nodules/read_file') // lecture de fichier
    var tbl = new Object()
    final = 0

_filesDir('./routes', (files)=>{ 
	files.forEach( (file)=>{ 
		if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
			console.log('file : '+ file )

		    // tbl.d = _readFile("./routes/"+file, (data)=>{
		    //     tbl.d = _decryptCode(data)+ '<br>'
		    //     if (++final == 1) _finalisation(response, info, tbl)
		    //     //if (final == 3) response.render(info.page, { info })
			// })
		}
		

		})

})


response.render(info.page, { info })
//readFiles(path.resolve(__dirname, '../routes/'), function(filename, content) { 
    //_fonctions.verif()
 
    //response.render(info.page, { info })
 
//    info.date = _fonctions.myDate()
}

 
 
module.exports = (_super)
