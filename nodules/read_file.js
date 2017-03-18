// ***** fichier read_file
var fs = require("fs")

readFile = function(fichier, callback){ // @ lecture de fichier asynchrone

	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			//console.log('data '+data)
			callback(data)
	})
}
 
 verif = (request, response) =>{console.log('verif read_file') }


readfile = (source) =>{

	if (!codage) var codage = 'utf8'
	fs.readFile(source,{encoding : 'utf8'}, (err, data) => {
		//console.log(data)
		return data
		
	})

}

readFileJson  = function(fichier, callback){
		fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			data = JSON.parse(data)

			//console.log('datafinal '+data)
			callback(data)
		})

}

multi = function(tblFonction, fin){ // @ exécution multiple de fonctions
console.log('multi')
	for (variable in tblFonction) {
		console.log('fonction '+variable)
		variable()
	}
			
}

finalisation = (response, info, tbl)=>{  // @ rendu après multitraitement
	console.log('fin des trois\n')
	response.render(info.page, { info, tbl })
}

decryptCode = (data)=>{ // @ filtre des lignes du code pour documentation automatique

var tblIn = data.split("\n") // conversion en array avec \n comme delimiter
var tblOut = new Object()
var tblSyntax = new Object()
tblSyntax.a = 'require'  // le testtest est le seul mot qui fait le match, il faut utiliser value ou key
tblSyntax.b = 'nepasused'
tblSyntax.c = '@'
tblSyntax.d = '****'

//console.log(typeof (data))
//console.log(tblIn)
// console.log('a'+tblSyntax)
// console.log('b'+Object.values.tblSyntax)

for (nb = 0; nb < tblIn.length; nb++)
{
	for (key in tblSyntax)
		if (tblIn[nb].indexOf(tblSyntax[key]) >= 0) 
			tblOut += (nb+1)+' '+tblIn[nb]+'<br>'
}
tblOut = tblOut.replace(/\[object Object\]/g, '')
tblOut = tblOut.replace(/var/g, '')
return tblOut
}




module.exports = (readFile, multi, finalisation, decryptCode, readFileJson, verif) // @Export function

//<% if (locals.info.data != undefined) { %><p><%= data } %></p>


