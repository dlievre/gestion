// ***** fichier test3.js
var fs = require("fs")
// ***** traitement super user
_super = (request, response) => { 
	// @ chargement des modules
	    var express = require('express') // @> express
	    var app = express()
	    //var router = express.Router();
	    var bodyParser = require('body-parser')// @> body-parser, formate le request d'un form
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
	        info.text = ''
	 
	var tbl = new Object()

	var suivi = new Object()
	suivi.path = './routes'
	suivi.nbFilesTotal = 0
	suivi.FilesTraitment = 0
	//***** traitement de la documentation auto
	// @ recupere les nom des fichiers d'un dossier
	debut0 = () =>{ 
		_filesDir(suivi.path, suite1)
		console.log('debut0')
	}
	// @ ne prend que les .js
	suite1 = (files)=>{ 
		files.forEach( (file)=>{ 
			if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
				++suivi.nbFilesTotal
			}
		})
		console.log(' suivi.nbFilesTotal '+suivi.nbFilesTotal)
		suite2(files)
	}
	// @ lecture du contenu des fichiers
	suite2 = (files)=> { 
		var no = 0
		files.forEach( (file)=>{
			if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
			_readFile(suivi.path+'/'+file, file, no++, suite3) // no permet de garder l'ordre
				console.log(no+' file : '+file)
			}
		})
	}
	// @ concaténation du contenu
	var results = []
	suite3 = (fichier, no, data)=>{ 
		++suivi.FilesTraitment
		console.log(suivi.FilesTraitment)
		results[no] = '***** <b>'+fichier+'</b> *****\n'+data.toString()
		console.log('no '+no+'fichier '+ fichier)
		//console.log('data '+ data)
		if (suivi.FilesTraitment === suivi.nbFilesTotal ) {
			for (i=0; i <= results.length; i++)
				info.text += i+'  Fichier '+results[i]
			console.log('fin concaténation ')
			suite4(info.text)
		}
	}
	// @ mise en forme du contenu
	suite4 = (data)=>{ 
		console.log('_decrypt')
		_decryptCode(data, suite5)
		//suivi = ''
	}
	// @ affichage du résultat
	suite5 = (data)=>{ 
		info.text = data // on maj les données du tableau gal pour le passer ensuite au rendu
		console.log('fin')
		response.render(info.page, {info})
	}


	debut0()

}



// _filesDir @  retourne la liste des fichiers d'un dossier
_filesDir = (dirname, callback)=> {
	fs.readdir(dirname,(err, files)=>{
	   if (err) { return console.error(err) }
	   	callback(files)
	})
}

// _readFile @ lecture de fichier asynchrone
_readFile = function(fichier, file, no, callback){ 
	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
	var tblOut = "<br>"
	//console.log(typeof (tblOut))
	var tblIn = data.split("\n") // conversion en array avec \n comme delimiter
	for (nb = 0; nb < tblIn.length; nb++)
		tblOut += (nb+1)+' '+tblIn[nb]+'<br>'
	console.log('data '+fichier)
	callback(fichier, no, tblOut)
	})
}

// decryptCode @  filtre des lignes du code pour documentation automatique
_decryptCode = (data, callback)=>{ 

	var tblIn = data.split("<br>") // conversion en array avec \n comme delimiter
	var tblOut = new Object()
	var tblSyntax = new Object()
	// @ liste des mots clé pris en compte
	//tblSyntax.a = 'require'
	tblSyntax.a = '@'
	tblSyntax.b = '****'
	tblSyntax.c = '#'
	//tblSyntax.d = module.exports

	console.log(typeof (data))
	//console.log(tblIn)
	console.log('a'+tblSyntax)
	console.log('b'+Object.values.tblSyntax) // ne fonctionne pas

	for (nb = 0; nb < tblIn.length; nb++)
	{
		for (key in tblSyntax){
			if (tblSyntax[key] == tblSyntax.c){
				//console.log('finir traitement @>')
				if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // traitement @>
					tblOut += tblIn[nb].substr(tblIn[nb].indexOf(tblSyntax[key])) +'<br>'
				if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // traitement @>
					console.log(' n '+tblIn[nb].indexOf(tblSyntax[key]))
				}
			if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // ajouter @>
				tblOut += tblIn[nb]+'<br>'
		}
	}

	tblOut = tblOut.replace(/\[object Object\]/g, '')
	tblOut = tblOut.replace(/var /g, '')
	tblOut = tblOut.replace(/\/\//g, '')
	callback(tblOut)
} 
 
module.exports = (_super, _filesDir)