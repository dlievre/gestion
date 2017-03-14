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


console.log('route index')

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
véhicule.saisie = 'yes'

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

//véhicule.requete = 'request.body.'+véhicule.niv

var domaines = new Object()
domaines.véhicule = 'véhicule'
domaines.voirie = 'voirie'
domaines.voirie_encombrant = 'voirie_encombrant'
domaines.voirie_mobilier = 'voirie_mobilier'


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
	if (info.menu) response.render(info.page, { info })
}

	//var info = new Object()
	info.titre_demande = "Dernières demandes"
	info.page = 'index'
	var menu = 'index'


	// if (request.body.véhiculedd){
		
	// 		info.menu = véhicule.menu
	// 		info.page = véhicule.page
	// 		info.niv =  véhicule.niv
	// 		info.msg = véhicule.msg
	// 		info.saisie = véhicule.saisie

	// 	//response.render(info.page, { info })

	// }
	

	// 	if (request.body.voiriedd){
	// 		console.log('voirie')
	// 		console.log('post voirie '+request.body.voirie)
	// 		init = 'non'
	// 		info.menu = 'index'
	// 		info.page = 'index'
	// 		info.niv =  'voirie'
	// 		info.msg = 'Intervention voirie'
	// 		info.saisie = 'no'


	// }
	// 	if (request.body.voirie_encombrant){
	// 		info.menu = 'index'
	// 		info.page = 'index'
	// 		info.niv =  'voirie_encombrant'
	// 		info.msg = 'Intervention voirie'
	// 		info.saisie = 'no'
	// }

	// 	if (request.body.voirie_mobilier){
	// 		info.menu = 'index'
	// 		info.page = 'index'
	// 		info.niv =  'voirie_mobilier'
	// 		info.msg = 'Intervention voirie'
	// 		info.saisie = 'yes'
	// 		//response.render('index', {menu, niv: "voirie_mobilier", msg:"Intervention voirie - Encombrant : Mobilier", saisie: 'ok', info })
	// }
		if (request.body.accident){
			info.menu = 'index'
			info.page = 'index'
			info.niv =  'accident'
			info.msg = 'Information : accident'
			info.saisie = 'no'
			//response.render('index', {menu, niv: "accident", msg:"Information : accident", saisie: 'no', info })
	}
		if (request.body.accident_route){
			info.menu = 'index'
			info.page = 'index'
			info.niv =  'accident_route'
			info.msg = 'Information : accident de la route'
			info.saisie = 'no'
			//response.render('index', {menu, niv: "accident_route", msg:"Information : accident de la route", saisie: 'no', info })
	}
		if (request.body.accident_grave){
			info.menu = 'index'
			info.page = 'index'
			info.niv =  'accident_grave'
			info.msg = 'Information :  accident grave de la route'
			info.saisie = 'yes'
			//response.render('index', {menu, niv: "accident_grave", msg:"Information :  accident grave de la route", saisie: 'ok' })
	}
		if (request.body.litige === 'ok' ){
			init = 'non'
			response.render('index', {menu, niv: "litige", msg:"Information : litige", btn: ['interne', 'client', 'commercial'] })
	}

		if (request.body.message){
			info.menu = 'index'
			info.page = 'index'
			info.niv =  ''
			info.msg = 'Votre message est transmis au service concerné : '+request.body.demande+' : '+request.body.message
			info.saisie = 'no'
	}
		if (request.body.aide === 'ok' ){
			var msg = 'débrouille-toi'
		response.render('index', {msg})
	}

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

app.get('/', (req, res) => {
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
