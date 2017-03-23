
// ***** fichier test.js
var fs = require("fs")
 
_test3 = (request, response) => { // @ retourne la date formatée
    var express = require('express')
    var app = express()
    //var router = express.Router();
    var bodyParser = require('body-parser')// body-parser, formate le request d'un form
    app.use(bodyParser.json()) // pour format json
    var multer = require('multer') // req.body récupère les champs d'un form
    var upload = multer()
    app.use(bodyParser.json()) //parsing application json
    app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded
 
    console.log('test')
 
    var _fonctions = require('../nodules/fonctions') // fonctions
    var moduleDateFormat = require('date-format')
 
        var info = new Object()
        info.menu = 'superuser'
        info.page = 'superuser'   
        info.date = _myDate()
        info.text = 'text'
 
var tbl = new Object()

var suivi = new Object()
suivi.path = './routes'
suivi.nbFilesTotal = 0
suivi.FilesTraitment = 0

debut0 = () =>{ // recupere les nom de fichier d'un dossier
	_filesDir(suivi.path, suite1)
	console.log('debut0')
}

suite1 = (files)=>{ // 
	files.forEach( (file)=>{ 
		if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
			++suivi.nbFilesTotal
		}
	})
	console.log(' suivi.nbFilesTotal '+suivi.nbFilesTotal)
	suite2(files)
}

suite2 = (files)=> { 
	files.forEach( (file)=>{
		if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
		_readFile(suivi.path+'/'+file, suite3)
			console.log('file : '+file)
		}
	})
}

suite3 = (fichier, data)=>{
	//console.log('read'+ data)
	++suivi.FilesTraitment
	console.log(suivi.FilesTraitment)
	tbl.fichier = data
	console.log('fichier '+ fichier)
	//console.log('data '+ data)
	if (suivi.FilesTraitment === suivi.nbFilesTotal ) suite4()
}

suite4 = ()=>{
	console.log('fin')
	response.render(info.page, { info, tbl})
	suivi = ''
}



debut0()

	

    //response.render(info.page, { info })
 
//    info.date = _fonctions.myDate()
}





// @ retourne la liste des fichiers d'un dossier
_filesDir = (dirname, callback)=> {
	fs.readdir(dirname,(err, files)=>{
	   if (err) { return console.error(err) }
	   	callback(files)
	})
}

_readFile = function(fichier, callback){ // @ lecture de fichier asynchrone
	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			console.log('data '+fichier)
			//console.log('data '+data)
			callback(fichier, data)
	})
}

decryptCode = (data)=>{ // @ filtre des lignes du code pour documentation automatique

	var tblIn = data.split("\n") // conversion en array avec \n comme delimiter
	var tblOut = new Object()
	var tblSyntax = new Object()
	// @ liste des mots clé pris en compte
	tblSyntax.a = 'require'
	tblSyntax.b = '@'
	tblSyntax.c = '****'
	//tblSyntax.d = module.exports

	console.log(typeof (data))
	//console.log(tblIn)
	console.log('a'+tblSyntax)
	console.log('b'+Object.values.tblSyntax) // ne fonctionne pas


	for (nb = 0; nb < tblIn.length; nb++)
	{
		for (key in tblSyntax)
			if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) 
				tblOut += (nb+1)+' '+tblIn[nb]+'<br>'
	}

	tblOut = tblOut.replace(/\[object Object\]/g, '')
	tblOut = tblOut.replace(/var /g, '')
	tblOut = tblOut.replace(/\//g, '')
	return tblOut
} 
 
module.exports = (_test3, _filesDir)