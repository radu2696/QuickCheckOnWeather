var apiServer = 'https://query.yahooapis.com/v1/public/yql';
var counter = 1;

function getDataFromApi(searchTerm) {
	
        var queryString = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + searchTerm + '")';
	$.ajax({
		url: apiServer,
		data: {
			format: 'json',
			q: queryString,
		},

		success: function(data) {
		console.log(data.query.results);
 		listProperties(data.query.results);
		}
	});

}


function listProperties(obj) {
         var results ="<table border=3>";
 	    results+="<tr><td>Title</td><td>"+obj.channel.title+"</td></tr>";

 	    results+="<tr><td colspan=2 align=center><b>Condition</b></td></tr>"; 	    
 	    results+="<tr><td>Date</td><td>"+obj.channel.item.condition.date+"</td></tr>";
 	    results+="<tr><td>Temp</td><td>"+obj.channel.item.condition.temp+"</td></tr>";
 	    results+="<tr><td>Text</td><td>"+obj.channel.item.condition.text+"</td></tr>";
 	    
 	    
 	    results+="<tr><td colspan=2 align=center><b>Units</b></td></tr>"; 	    
 	    results+="<tr><td>Distance</td><td>"+obj.channel.units.distance+"</td></tr>";
 	    results+="<tr><td>Pressure</td><td>"+obj.channel.units.pressure+"</td></tr>";
 	    results+="<tr><td>Speed</td><td>"+obj.channel.units.speed+"</td></tr>";

 	    results+="<tr><td colspan=2 align=center><b>Location</b></td></tr>"; 	    
 	    results+="<tr><td>City</td><td>"+obj.channel.location.city+"</td></tr>";
 	    results+="<tr><td>Country</td><td>"+obj.channel.location.country+"</td></tr>";
 	    results+="<tr><td>Region</td><td>"+obj.channel.location.region+"</td></tr>";

 	    results+="<tr><td colspan=2 align=center><b>Wind</b></td></tr>"; 	    
 	    results+="<tr><td>Chill</td><td>"+obj.channel.wind.chill+"</td></tr>";
 	    results+="<tr><td>Direction</td><td>"+obj.channel.wind.direction+"</td></tr>";
 	    results+="<tr><td>Speed</td><td>"+obj.channel.wind.speed+"</td></tr>";

 	    results+="<tr><td colspan=2 align=center><b>Atmosphere</b></td></tr>"; 	    
 	    results+="<tr><td>Humidity</td><td>"+obj.channel.atmosphere.humidity+"</td></tr>";
 	    results+="<tr><td>Pressure</td><td>"+obj.channel.atmosphere.pressure+"</td></tr>";
 	    results+="<tr><td>Rising</td><td>"+obj.channel.atmosphere.rising+"</td></tr>";
 	    results+="<tr><td>Visibility</td><td>"+obj.channel.atmosphere.visibility+"</td></tr>";


 	
	results+="</tables>";
    $('.js-search-results-' + counter).html(results);
    if(counter === 6){
 	   counter = 1; 	
 	    }
    else counter ++;
}





function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query);
  });
}

$(watchSubmit);
