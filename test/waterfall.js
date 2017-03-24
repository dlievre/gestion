var p = './tmp'

var  async  = require('async')
var  fs     = require('fs')



async.waterfall([

	function(callback){
		fs.readdir(p, function (err, files){
			if (err) callback(true);
			else callback(false, files)
		});
	}, //next

	function(res1, callback){
		//async.filter(res1, function(aFileName,cb) {
	   	// if (aFileName.indexOf('.txt') > 0) 
	   	// //if (aFileName.indexOf('.txt') > 0 || aFileName.indexOf('.js') > 0) 
	   	// 	cb(true);
	   	// else 
	   	// 	cb(false);
	 // }, function (results){console.log(results)});
	 	resfic = []
	 	for (var i=0; i<res1.length;i++){
	 		if (res1[i].indexOf('.txt')>0 || res1[i].indexOf('.html')>0)
	 			resfic.push(p+'/'+res1[i])
	 	}

		callback(false, resfic)
	}, //next

	function(res2, callback){
	  	async.map(res2, fs.readFile, function(err,contents) {
		     if (err) { callback(err); } else {
		        callback(false,contents);
		     }
		   });
	}, //next

	function(res3, callback){
		res4 = ''
		for (var i=0;i<res3.length;i++){
			res4+= res3[i].toString().replace(/<\//g, '')+'\n'
		}
		callback(false, res4)
	}

],
	 //last
function(err,results){
	console.log(results)
})
console.log('**********************************************************')