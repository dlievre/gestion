var nombre = [1, 2, 3]
var nombre1= [...nombre,5]
console.log(nombre1)

console.log("============================")

moment = require('moment')
today = moment()
future = today.clone().add(1, 'years')
console.log(today === future)

console.log("=============================")

//fonctions pures
// 1 : non pure
function count_eleves()
{
	console.log("il y a " + eleves.length + " eleves")
}

var eleves = ["marc", " alain", "pierre"]
count_eleves()

console.log("---------------------------")

//2: pure
function count_eleves1(eleves)
{
	console.log("il y a " + eleves.length + " eleves")
}

var eleves = ["marc", " alain", "pierre"]
var eleves1 = [...eleves, "louis"]
count_eleves1(eleves)
count_eleves1(eleves1)

console.log("---------------------------")

//3: non pure
function count_eleves1(eleves)
{
	console.log("il y a " + eleves.length + " eleves")
}

function ajouterEleve(eleves, eleve){
	eleves.push(eleve)
	return eleves
}

console.log("---------------------------")


var eleves = ["marc", " alain", "pierre"]
ajouterEleve(eleves, "Demo")
console.log(eleves)

//3.1: pure
function count_eleves1(eleves)
{
	console.log("il y a " + eleves.length + " eleves")
}

function ajouterEleve(eleves, eleve){
	return [...eleves, eleve]
}

var eleves = ["marc", " alain", "pierre"]

console.log(ajouterEleve(eleves, "Demo"))

console.log("=============================")

//4: nom pure
var eleve = {name: "Marc", notes: [18, 20]}

let ajouterNote = function(eleve, note){
	eleve.notes.push(note)
	return(eleve)
} 

console.log(ajouterNote(eleve, 10))

//4: pure
var eleve1 = {name: "Marc", notes: [18, 20]}

let ajouterNote1 = function(eleve, note){
	let nouvelle_notes = [...eleve1.notes, note]
	return Object.assign({}, eleve, {note: nouvelle_notes}) //on passe les proprietes de eleve
} 

console.log(ajouterNote1(eleve1, 10))
console.log(eleve1)

console.log("=============================")

var obj = { a: 1 };
var copie = Object.assign({}, obj);  //cible {}, source obj
console.log(copie); // {a: 1}

console.log("=============================")

var format = require('date-format');
console.log(format.asString(new Date()))

console.log(format('hh:mm:ss.SSS', new Date()))

console.log("=============================")

function adder(value){
	return function (inc){
		return value + inc	
	}
}

var add10 = adder(10)
console.log(add10(5))
console.log(adder(10)(5))

console.log("=============================")

var numbers = [1, 2, 3, 4]
console.log("element num 2: "+numbers[1])

num10 = numbers.map(function(item){
	return item * 10
})
console.log(num10)

console.log("---------------------------")

num10 = numbers.filter(function(item){
	return item % 2 ==0
})
console.log(num10)

console.log("---------------------------")

let sum = numbers.reduce(function(acc, item){
	return acc + item
},0)

console.log(sum)

console.log("---------------------------")

var eleves = [{"name": "Lievre Dominique", notes: [12, 5, 13, 9, 11]}, {"name": "Pasqualini Thierry", notes: [17, 55, 18, 17, 19]}, {"name": "Pitre Franck", notes: [11, 5, 3, 9, 11]}]

names = eleves.map(function(eleve){
	return(eleve.name)
})
console.log(names)

eleves_p = eleves.filter(function (eleve){
	return (eleve.name.charAt(0) === 'P') 
})

console.log(eleves_p)
console.log('*')

let notes = eleves[0].notes
let sum1 = notes.reduce(function(acc, note){
	return acc + note
},0) 

console.log(notes + " : " + sum1 / notes.length)

//tableau des eleves qui ont une note >=10

eleves_p1 = eleves.filter(function(eleve){

 	let moyenne = eleve.notes.reduce(function(acc, note){
		return acc + note
	},0) / eleve.notes.length
	return (moyenne >= 10)
})

console.log(eleves_p1)

console.log('*')

let moyenne = function (notes){
	 return notes.reduce(function(acc, note){
		return acc + note
	},0) / notes.length
}

let top_eleves0 = eleves.map(function(eleve){
	return Object.assign({}, eleve, {moyenne: moyenne(eleve.notes)})
})

console.log(top_eleves0)
console.log('.')

let top_eleves = eleves.map(function(eleve){
	return Object.assign({}, eleve, {moyenne: moyenne(eleve.notes)})
}).filter(function(eleve){
	return eleve.moyenne >=10
})

console.log(top_eleves)
