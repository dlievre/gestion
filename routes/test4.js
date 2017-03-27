var fs = require("fs")
// ***** traitement super user
_super = (request, response) => { 
	// ***** chargement des modules
	    var express = require('express') // @ express
	    var app = express()
	    //var router = express.Router();
	    var bodyParser = require('body-parser')// @ body-parser, formate le request d'un form
	    app.use(bodyParser.json()) // pour format json
	    var multer = require('multer') // @ req.body récupère les champs d'un form
	    var upload = multer()
	    app.use(bodyParser.json()) //parsing application json
	    app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded
	 var Type = require('type-of-is') // @ type-of-is 
	 // https://www.npmjs.com/package/type-of-is
	    console.log('test')
	 
	    var _fonctions = require('../nodules/fonctions') // fonctions
	    var moduleDateFormat = require('date-format') // @ module date-format
	 
	        var info = new Object()
	        info.menu = 'superuser'
	        info.page = 'superuser'   
	        info.date = _myDate()
	        info.text = ''
	 
	var tbl = new Object()

	var suivi = new Object()
	suivi.path = './routes'
	//suivi.nbDirTotal = 1
	//suivi.DirTraitment = 0
	suivi.nbFilesTotal = 0
	suivi.FilesTraitment = 0


allFiles = new Object()
allFiles.fichiers = ''
	//***** traitement de la documentation auto
	// @ recupere les noms des fichiers d'un dossier
	debut0 = () =>{ 
		_filesDir(suivi.path, suite1)
		console.log('debut0')
	}
	
	// @ ne prend que les .js
	suite1 = (files)=>{ 
		//console.log(typeof (files)+' files '+Object.values(files)+'  '+Object.keys(files) +' tof '+typeof(Object.values(files)))
		files.forEach( (file)=>{ 
			if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
				//console.log('..'+file)
				//console.log(typeof (file)+' file '+Object.values(file)+'  '+Object.keys(file)+' tof '+typeof(+Object.keys(file)))
				allFiles['user.js'] = Object.values(file).toString()
				console.log(Object.values(file).toString())
				//console.log(typeof (allFiles)+' files '+Object.values(allFiles)+'  '+Object.keys(allFiles))
				//allFiles = Object.assign({}, file);
				//Object.defineProperty(allFiles, Object.keys(file), {value : Object.values(file)})
				//console.log('xx '+Object.values(allFiles))
				++suivi.nbFilesTotal
			}
		})
		//console.log(typeof (allFiles)+' allFiles '+Object.values(allFiles)+'  '+Object.keys(allFiles))
		//console.log(' suivi.nbFilesTotal '+suivi.nbFilesTotal)
		suite2(allFiles)
	}
	// @ lecture du contenu des fichiers
	suite2 = (files)=> { 
		console.log('Type :'+Type.of (files)+' files '+Object.values(files)+'  '+Object.keys(files))
		var no = 0
		//console.log(' file :')
		for (i=0;i < files.length;i++){
			console.log(i+' file : '+files[i])
		}
		// files.forEach( (file)=>{
		// 	if (file.indexOf('.js') >= 0 || file.indexOf('.ejs') >= 0){
		// 	_readFile(suivi.path+'/'+file, file, no++, suite3) // no permet de garder l'ordre
		// 		console.log(no+' file : '+file)
		// 	}
		// })
	}

suite3 = (fichier, no, data)=>{ console.log('ok')}
	// @ concaténation du contenu
	var results = []
	suite3b = (fichier, no, data)=>{ 
		++suivi.FilesTraitment
		console.log(suivi.FilesTraitment)
		results[no] = '***** <b>'+fichier+'</b> *****\n'+data.toString()
		console.log('no '+no+'fichier '+ fichier)
		if (suivi.FilesTraitment === suivi.nbFilesTotal ) {
			for (i=0; i <= results.length; i++)
				info.text += results[i]
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

	// @ affichage
	suite5 = (data)=>{ 
		info.text += data // on maj les données du tableau gal pour le passer ensuite au rendu
		response.render(info.page, {info})// @ affichage du résultat
	}


	debut0()



//  @ _filesDir - retourne la liste des fichiers d'un dossier
_filesDir = (dirname, callback)=> {
	fs.readdir(dirname,(err, files)=>{
	   if (err) { return console.error(err) }
	   	callback(files)
	})
}

//  @ _readFile - lecture de fichier asynchrone
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

// @ _decryptCode - filtre des lignes du code pour documentation automatique
_decryptCode = (data, callback)=>{ 

	var tblIn = data.split("<br>") // conversion en array avec \n comme delimiter
	var tblOut = new Object()
	var tblSyntax = new Object()
	// @ liste des mots clé pris en compte
	//tblSyntax.a = 'require'
	tblSyntax.a = ' '+'@ '
	tblSyntax.e = '**'+'**'
	tblSyntax.aa = '@'+'@'
	//tblSyntax.d = module.exports

	console.log(typeof (data))
	//console.log(tblIn)
	console.log('a'+tblSyntax)
	console.log('b'+Object.values.tblSyntax) // ne fonctionne pas

	for (nb = 0; nb < tblIn.length; nb++)
	{
		for (key in tblSyntax){
			if (tblSyntax[key] == tblSyntax.a)
				if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // 
					tblOut += '&nbsp;&nbsp;&nbsp;&nbsp;'+tblIn[nb].substr(tblIn[nb].indexOf(tblSyntax[key])) +'<br>'
			if (tblSyntax[key] == tblSyntax.aa)
				if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // 
					tblOut += tblIn[nb]+'<br>'
			if (tblSyntax[key] == tblSyntax.e)
				if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) // 
					tblOut += tblIn[nb]+'<br>'
		}
	}
// @@ remplacement caracteres
	tblOut = tblOut.replace(/\[object Object\]/g, '')
	tblOut = tblOut.replace(/var /g, '')
	//tblOut = tblOut.replace(/@/g, '-')
	tblOut = tblOut.replace(/\/\//g, '')
	callback(tblOut)
} 
 
}// _super
module.exports = (_super)