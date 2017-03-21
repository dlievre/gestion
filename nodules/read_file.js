// ***** fichier read_file
var fs = require("fs")

_readFile = function(fichier, callback){ // @ lecture de fichier asynchrone

	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			//console.log('data '+data)
			callback(data)
	})
}
 
_verif = () =>{console.log('verif read_file') }


_readfile = (source) =>{

	if (!codage) var codage = 'utf8'
	fs.readFile(source,{encoding : 'utf8'}, (err, data) => {
		//console.log(data)
		return data
		
	})
}

_readFileJson  = function(fichier, callback){
		fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			data = JSON.parse(data)

			//console.log('datafinal '+data)
			callback(data)
		})
}

_multi = function(tblFonction, fin){ // @ exécution multiple de fonctions
console.log('multi')
	for (variable in tblFonction) {
		console.log('fonction '+variable)
		variable()
	}		
}

_finalisation = (response, info, tbl)=>{  // @ rendu après multitraitement
	console.log('fin des actions\n')
	response.render(info.page, { info, tbl })
}

_decryptCode = (data)=>{ // @ filtre des lignes du code pour documentation automatique

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
	tblOut = tblOut.replace(/\//g, '')
	return tblOut
}

 
// ********  miseenformejson
_decryptJson = (data)=>{ // @ filtre des lignes du code pour documentation automatique
 
 
    data = data.replace(/,/g, '<br>')
    data = data.replace(/"/g, ' ')
    //data = data.replace(/\//g, '')
    return data
}


// @ retourne la liste des fichiers d'un dossier
readFiles = (dirname)=> {

	is_file = require('is-file')
 	path = require("path");
	console.log("read directory /routes")
	fs.readdir("./routes/",function(err, files){
	   if (err) {
	      return console.error(err)
	   }
	   files.forEach( (file)=>{
	   	
	      //if (file.indexOf('.DS') < 0 )  console.log(  is_file(file) +' '+file )
	      is_file(path.join('./routes', file), function(err, bool){
	     	if (bool) console.log( '--- '+path.join('./routes', file) )
	     		else
	     		console.log( '+++ '+path.join('./routes', file) )	
	      }) 
	     
	   })
	})
}

// @ retourne la liste des fichiers d'un dossier
_filesDir = (dirname, callback)=> {
	fs.readdir(dirname,(err, files)=>{
	   if (err) {
	      return console.error(err)
	   }
	   	callback(files)
	})
}

// ********  miseenformejson

module.exports = (_readFile, _multi, _finalisation, _decryptCode, _readFileJson, readFiles, _filesDir, _verif) // @Export function



