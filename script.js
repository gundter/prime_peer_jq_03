var apikey = '728618f4cc37c292e2a09339bb33711dd540ddbd'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
	for(var i = 0; i < results.length; i++) {
		var platforms = "";
		for(var j = 0; j < results[i].platforms.length; j++){
			platforms += results[i].platforms[j].name + ", ";
		}
		platforms = platforms.slice(0,platforms.length-2);
		var releaseDate = new Date (results[i].original_release_date).toLocaleDateString();
		console.log(platforms);
		$('.container').append("<div class='col-md-4'><h3>" + results[i].name + "</h3><img src='" + results[i].image.icon_url + "'><div class='result'>" + results[i].deck + "<br> <strong>Release date:</strong> " + releaseDate +"<br> <strong>Platforms:</strong> "+ platforms + "</div> </div>");
	}
}

$(document).ready(function() {

	// Start the search here!
	search('batman');


});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
