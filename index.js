// # routage des post et get
// ***** chargement des modules
var express = require('express')
var app = express()
//var router = express.Router();

var bodyParser = require('body-parser')// @ body-parser, formate le request d'un form
app.use(bodyParser.json()) // pour format json
var multer = require('multer') // @ multer req.body récupère les champs d'un form
var upload = multer()
app.use(bodyParser.json()) //parsing application json
app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded

var datejour = require('date-format')  // @ date-format
var now = new Date()
var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
now = now.toLocaleDateString("fr-FR", options)

console.log('index.js')

var _fonctions = require('../nodules/fonctions') // @ nodules/fonctions
//var theDate = myDate()

// ***** tableau global des boutons 
var domaine = function() { // @ variables menu, page, niv, msg, saisie
	this.id = '',
	this.nom = '',
	this.menu = 'index',
	this.page = 'index',
	this.niv = '',
	this.msg = '',
	this.saisie = 'no'
}

var véhicule = new domaine()
véhicule.niv = 'véhicule'
véhicule.msg = 'Intervention véhicule'
véhicule.saisie = 'no'
var réparation = new domaine()
réparation.niv = 'réparation'
réparation.msg = 'Intervention réparation véhicule'
réparation.saisie = 'yes'

var voirie = new domaine()
voirie.niv = 'voirie'
voirie.msg = 'Intervention voirie'
voirie.saisie = 'no'
var voirie_encombrant = new domaine()
voirie_encombrant.niv = 'voirie_encombrant'
voirie_encombrant.msg = 'Intervention voirie / encombrant'
voirie_encombrant.saisie = 'no'
var voirie_mobilier = new domaine()
voirie_mobilier.niv = 'voirie_mobilier'
voirie_mobilier.msg = 'Intervention voirie / encombrant : mobilier'
voirie_mobilier.saisie = 'yes'

var accident = new domaine()
accident.niv = 'accident'
accident.msg = 'Information : accident'
accident.saisie = 'no'
var accident_route = new domaine()
accident_route.niv = 'accident_route'
accident_route.msg = 'Information :  accident de la route'
accident_route.saisie = 'no'
var accident_grave = new domaine()
accident_grave.niv = 'accident_route_grave'
accident_grave.msg = 'Information :  accident grave de la route'
accident_grave.saisie = 'yes'
//véhicule.requete = 'request.body.'+véhicule.niv

var domaines = new Object() // liste des 
domaines.véhicule = 'véhicule'
domaines.réparation = 'réparation'
domaines.voirie = 'voirie'
domaines.voirie_encombrant = 'voirie_encombrant'
domaines.voirie_mobilier = 'voirie_mobilier'
domaines.accident = 'accident'
domaines.accident_route = 'accident_route'
domaines.accident_grave = 'accident_route_grave'

// ***** traitement des routes et clics des form / boutons
app.post('/', upload.array(), (request, response) => { //@ app.post('/' écoute des boutons
	var sess = request.session

	for (variable in domaines) {	
		requete = 'request.body.'+variable

		var info = new Object()
		if (eval(requete)){
			console.log('req '+variable+ eval(variable.niv))
				info.menu = eval(variable+'.menu')
				info.page = eval(variable+'.page')
				info.niv =  eval(variable+'.niv')
				info.msg = eval(variable+'.msg')
				info.saisie = eval(variable+'.saisie')
		}
		if (request.body.message){
			console.log (request.body+' '+request.body.message.lenght)
			info.menu = 'index'
			info.page = 'index'
			info.niv =  ''
			info.msg = 'Votre message est transmis au service concerné : '+request.body.demande+' : '+request.body.message
			info.saisie = 'no'
		}

		if (info.menu) response.render(info.page, { info })
	}

	//var info = new Object()
	info.titre_demande = "Dernières demandes"
	info.page = 'index'
	var menu = 'index'


	if (request.body.map){ // @ géolocalisation de la demande
		info.menu = 'map'
		info.page = 'map'
		info.adresse = request.body.map
		_map(request, response, info)
	}

})
// ***** traitement map
app.get('/map', upload.array(), (request, response) => { // @ app.get('/map' - géolocalisation des sites
	var sess = request.session

	var info = new Object()
	info.menu = 'map'
	info.page = 'map'
	info.adresse = '255, avenue des champs-elysees, paris'
	info.lat = 48.8946566
	info.long = 2.2753577

	console.log ('map : '+info.adresse)
	_map(request, response, info)

})
// https://www.npmjs.com/package/angular2-nvd3-aot
// ***** traitement graphic
app.get('/graphic', upload.array(), (request, response) => { // @ app.get('/graphic' - graphic
	var sess = request.session

	var info = new Object()
	info.menu = 'graphic'
	info.page = 'graphic'

	info.long = 2.2753577

	console.log ('graphic : a etudier')
	_map(request, response, info)

})

// ***** traitement superuser
app.get('/superuser', upload.array(), (request, response) => {  // @ app.get('/superuser' superuser
	var sess = request.session
	console.log ('superuser')

	var _fonctions = require('./superuser')
	_super(request, response) // @ _super - './superuser'

})

// ***** traitement base de donnée
app.get('/base', upload.array(), (request, response) => {  // @ app.get('/base'
	var sess = request.session
	console.log ('index test')

	//***** gestion de la base de donnée
	var nodule_CBasedb = require('../nodules/CBasedb')
	_base(request, response)

})


// ***** traitement superuser
app.get('/test4', upload.array(), (request, response) => {  // @ app.get superuser
	var sess = request.session
	console.log ('index test4')

	var _fonctions = require('./test4') // fonctions
	_super4(request, response)

})


app.get('/fichiers2', upload.array(), (request, response) => {
	var fs = require("fs"),
    path = require("path");
    is_file = require('is-file')
	var p = './superuser'
	fs.readdir(p, function (err, files) {
	    if (err) {
	        throw err;
	    }
	    files.map((file)=>{
	    	is_file(path.join(p, file), (err, bool)=>{
	    		if (bool) { 
	    			console.log('Fichier: '+path.join(p, file))
					fs.readFile(path.join(p, file), {encoding : 'utf8'}, (err, data) => {
						console.log(data)		
					})
	    		}else{ 
	    			console.log('repertoire: '+path.join(p, file))	
	    		}})
	    	})
	})
})	


app.get('/', (req, res) => { // traiter le cas apres demande erreur sur console 
	var sess = req.session
	var info = new Object()

	info.menu = 'index'
	info.page = 'index'
	info.niv =  'home'
	info.msg = ''
	info.text = "Choisissez l'évènement"
	info.saisie = 'no'

	info.titre_demande = "Dernières demandes"
	info.titre = 'info'
	res.render(info.page, {info})
	console.log('Get = '+req.body)
})

// ***** affichage des erreurs
//source https://nodejs.org/api/errors.html
//source http://expressjs.com/fr/guide/error-handling.html
var methodOverride = require('method-override')
app.use(methodOverride())
app.use(function(err, req, res, next) {
console.log ('err.stack '+err.stack)
console.log ('err '+err)

//console.log ('req '+req)
//console.log ('res '+res)
app.set('view engine', 'ejs')
res.render('error', { err, req, res })

})
module.exports = (app);