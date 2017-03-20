// ***** fichier fonctions

myDate = () => { // @ retourne la date formatée
	var format = require('date-format')
	var today = format.asString('dd-MM-yyyy hh:mm', new Date())
	return (today)
}
myDate1 = () => { // @ retourne la date formatée
	var format = require('date-format')
	var today = format.asString('MM-yyyy hh:mm', new Date())
	return (today)
}
 
//module.exports = (myDate) // @Export functions
exports.myDate = myDate
exports.myDate1 = myDate1