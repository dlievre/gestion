// ***** fichier test.js
var fs = require("fs")
 
_test1 = (request, response) => { // @ retourne la date formatée
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
 
    //console.log(theDate)
 
 var suivi = new Object()
 suivi.fin = 0
 suivi.nbFiles = 0
 suivi.niv2 = 'suite()'

next = 'suite'
var i = 0
var async = require('async')
async.concat(['./nodules/','./routes/','./view/'], fs.readdir, (err, resultsa)=> {
    // results is now an array of stats for each file

        	for (i=1; i<resultsa.length;i++)
        	{
        		console.log(resultsa[i])
        	}

})
var i = 0
async.map(['./routes/index.js','./routes/superuser.js','./routes/users.js'], fs.readFile, (err, results)=> {
    // results is now an array of stats for each file

        	for (i=1; i<results.length;i++)
        	{
        		//console.log(results[i].toString('utf8'))
        	}

})



// async.waterfall(
//   [
//     // Lecture des fichiers
//     function(callback) { async.map(fichiers, fs.readFile, callback); },
//     // Écriture du fichier final avec la concaténation des contenus
//     function(contenus, callback) { fs.writeFile('fichierFinal', contenus.join(''), callback); },
//     // Succès
//     function() { console.log('OK'); }
//   ],
//   // Erreur
//   function(err) { console.log('FAIL: ' + err.message); }
// );


response.render(info.page, { info, })

    //response.render(info.page, { info })
 
//    info.date = _fonctions.myDate()
}



var suivi = new Object()

suivi.nbFilesTotal = 0
suivi.FilesTraitment = 0
suivi.niv2 = 'suite()'
var result = new Object()

	_filesDir('./routes', (files)=>{ 
		files.forEach( (file)=>{ 
			if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
				++suivi.nbFilesTotal
			}
		})
		console.log(suivi.nbFiles)

		files.forEach( (file)=>{ 
			
			console.log('file : '+ file )
			result.file = file
			++suivi.FilesTraitment
			_readFile(file, suivi, suite())
			console.log('Suivi cb fin: '+suivi.FilesTraitment)
			if (suivi.FilesTraitment === suivi.nbFilesTotal) { 
				console.log('render')



				//if(suivi.niv2) suivi.niv2
				

			}		
			
		})
	})



traitementFichier = (suivi)=>{
}

function _read (dirname)
{	fs.readdir(dirname,(err, files)=>{
	   if (err) {
	      return console.error(err)
	   }
	   	return (files)
	})
}

suite = (data, suivi)=> {
//console.log('data '+data)
console.log('suite'+suivi.nbFilesTotal)
	console.log('suite')}

// @ retourne la liste des fichiers d'un dossier
_filesDir = (dirname, callback)=> {
	fs.readdir(dirname,(err, files)=>{
	   if (err) {
	      return console.error(err)
	   }
	   	callback(files)
	})
}

_readFile = function(fichier, suivi, callback){ // @ lecture de fichier asynchrone

	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			//console.log('data '+data)
			console.log('data '+fichier)
			suite(data, suivi)
			//callback(data)
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
 
module.exports = (_test1, _filesDir)