var apikey = '874568ad8c8402451210db15f2439a3771783d9f';//'YOUR-API-KEY'; // Put your API key here

// Use this function to do stuff with your results.
function searchCallback(results) {
    console.log(results);
}

$(document).ready(function() {

	// Start the program here!

});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
