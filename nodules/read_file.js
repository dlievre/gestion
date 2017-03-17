//***** gestio de la map
// @ map = (request, response, info)

//let reqhttp = require('request')// module requete http
//let fs = require('fs')
//let readline = require('readline')

readFile = function(fichier, callback){
	var fs = require("fs")
	fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			//console.log('data '+data)
			callback(data)
	})
}
 
 verif = (request, response) =>{console.log('verif read_file') }


readfile = (source) =>{

	if (!codage) var codage = 'utf8'

	var fs = require("fs")
	fs.readFile(source,{encoding : 'utf8'}, (err, data) => {
		//console.log(data)
		return data
		
	})

}

readFileJson  = function(fichier, callback){
	var fs = require("fs")
		fs.readFile(fichier, {encoding : 'utf8'}, (err, data) => {
			data = JSON.parse(data)

			//console.log('datafinal '+data)
			callback(data)
		})

}

multi = function(tblFonction, fin){
console.log('multi')
	for (variable in tblFonction) {
		console.log('fonction '+variable)
		variable()
		
	}
			
}

finalisation = (response, info, tbl)=>{

	//console.log('obj '+Object.values(tbl))
	////for (i=0; i< tbl.length; i++)

	//for ( variable in tbl)
		//console.log(variable)
	console.log('fin des trois\n')


		response.render(info.page, { info, tbl })


}

decryptCode = (data)=>{

var tblIn = data.split("\n") // conversion en array avec \n comme delimiter
var tblOut = new Object()
var tblSyntax = new Object()
tblSyntax.testtest = 'require'  // le testtest est le seul mot qui fait le match, il faut utiliser value ou key
tblSyntax.tututu = 'nepasused'
tblSyntax.quiqui = '@'
tblSyntax.comment = '****'

//console.log(typeof (data))
//console.log(tblIn)
//console.log(tblSyntax)

for (key in tblSyntax){
	console.log(tblSyntax[key])
}
console.log(tblSyntax)
var nb = 0
	for (i = 0; i < tblIn.length; i++)
	{
		nb++
		console.log(nb)
		for (syntax in tblSyntax)
		{
			if (tblIn[i].match(syntax)) 
			{
				tblOut += tblIn[i]+'<br>'
				console.log('ligne ok '+tblIn[i]+' '+tblIn[i].match(syntax))
			}
		}

	}
return tblOut
}




module.exports = (readFile, multi, finalisation, decryptCode, readFileJson, verif)

//<% if (locals.info.data != undefined) { %><p><%= data } %></p>


