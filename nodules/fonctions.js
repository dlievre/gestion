// ***** fichier fonctions

_myDate = () => { // @ retourne la date formatée
	var format = require('date-format')
	var today = format.asString('dd-MM-yyyy hh:mm', new Date())
	return (today)
}




 
module.exports = (_myDate) // @Export functions
