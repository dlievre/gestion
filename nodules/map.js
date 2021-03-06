//***** gestion de la map GoogleMap
// @ map = (request, response, info)

let reqhttp = require('request')// module requete http

 _map = (request, response, info) =>{
	if (info.adresse && !info.lat){
	    var openadresse = function(adresse, callback){
	       adresse = adresse.replace(/^\s*|\s*$/,'')
	       //localisation = adresse.replace(/[ ]{2,}/, '%20')

     		localisationUrl = encodeURI(adresse)
     		outputMode = 'json';    // csv / xml / kml / json
			apiKey = 'AIzaSyBs8KgSJaS22nC7jXn710_1SixIrMetyn4';  
			urlGeocoder = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + localisationUrl+ '&key=' + apiKey
        	console.log('info.adresse : '+urlGeocoder)
	        var url = urlGeocoder
	        reqhttp(url, function(err, response, body){
				try{
			        var result = JSON.parse(body)
			        callback(result)
				}
				catch(e){
		        	callback(e)
				}
	        })
	    }
	    
	    
	    openadresse(info.adresse,  function (latlong)
	    {
	     //if (err) return console.log(err);
	      response.render(info.page, {info, lat: latlong.results[0].geometry.location.lat, lon: latlong.results[0].geometry.location.lng})
		})
  
    } // info.adresse
   	if (info.lat){
		response.render(info.page, {info, lat: info.lat, lon: info.long})
	}
}

module.exports = _map