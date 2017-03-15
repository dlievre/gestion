//***** gestio de la map
// @ map = (request, response, info)

//let reqhttp = require('request')// module requete http
//let fs = require('fs')
//let readline = require('readline')


read_file = (source, codage) =>{

	if (!codage) var codage = 'utf-8'

	var fs = require("fs")
	fs.readFile(source,{encoding : codage}, (err, data) => {
		//console.log(data)
		return eval(data)
		
	})

}



module.exports = read_file