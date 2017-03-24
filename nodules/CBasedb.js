//***** connection à la base
// @ map = (request, response, info)

	var mysql = require("mysql");

_base =  (request, response) => { // @ fonction base

	//var connection = mysql.createConnection({

			//mysql:dbname=db665127288;host=db665127288.db.1and1.com;"
			// host : 'db665127288.db.1and1.com',
			// user : 'dbo665127288',
			// password : '42piscinedltp',
			// database : 'db665127288'
	////port : 3307

	//	})

	//First you need to create a connection to the db
	var connection = mysql.createConnection({
	  host: "e1r11p18",
	  user: "root",
	  password: "root",
	  database: "tuto",
	  port : 3307
	});

	//connection.connect()

	var datejour = require('date-format');
	var now = new Date()
	var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
	now = now.toLocaleDateString("fr-FR", options)

	console.log('CBasedb.js')




	// First you need to create a connection to the db
	// var con = mysql.createConnection({
	//   host: "localhost",
	//   user: "root",
	//   password: "root",
	//   database: "tuto",
	//   port : 3307
	// });

	connection.connect(function(err){
	  if(err){
	    console.log('Error connecting to Db'+err);
	    return ;
	  }
	  console.log('Connection established');
	});


	var sess = request.session;
	var info = new Object();
	info.menu = 'superuser';
	info.page = 'superuser';
	info.datejour = datejour(now);
	console.log ('superuserSql: ');

	connection.query("SELECT * FROM messages", (err, rows, fields) => {
		if(err){
			console.log('Erreur dans la requete');
		}
		else
		{
			console.log(rows);
			var info = new Object();
			info.menu = 'superuser';
			info.page = 'superuser';
			info.text = 'data';  //data
			info.datejour = datejour(now);
			info.rows = rows;
			connection.end();
			response.render(info.page, {info});  
		}

	});


	// con.end(function(err) {
	//   // The connection is terminated gracefully
	//   // Ensures all previously enqueued queries are still
	//   // before sending a COM_QUIT packet to the MySQL server.
	// });
}


module.exports = _base
