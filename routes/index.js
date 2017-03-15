var express = require('express')
var app = express()
//var router = express.Router();

// @ body-parser, formate le request d'un form
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // pour format json
var multer = require('multer')
var upload = multer()
app.use(bodyParser.json()) //parsing application json
app.use(bodyParser.urlencoded({extended: true})) // parsing application x/www-form-urlencoded




console.log('index.js')

var domaine = function() {
//var domaine.vehicule = new Object()
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


app.post('/', upload.array(), (request, response) => {
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


if (request.body.map){ 
	info.menu = 'map'
	info.page = 'map'
	info.adresse = request.body.map
	map(request, response, info)
	
}

	//if (info.menu != 'map') response.render(info.page, { info })

})

app.get('/map', upload.array(), (request, response) => {
	var sess = request.session

	var info = new Object()
	info.menu = 'map'
	info.page = 'map'
	info.adresse = '255, avenue des champs-elysees, paris'
	info.lat = 48.8946566
	info.long = 2.2753577

console.log ('map : '+info.adresse)
	map(request, response, info)

})

app.get('/superuser', upload.array(), (request, response) => {
	var sess = request.session
console.log('index superuser')
	var info = new Object()
	info.menu = 'superuser'
	info.page = 'superuser'

	//read_file("./texte.txt")
	read_file("./package.json", 'utf8',  (err, data)=>{ info.data})
	console.log('info.data '+info.data)


//if (info.menu) response.render(info.page, { info })

console.log ('superuser : ')


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

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = (app);
