var apikey = '728618f4cc37c292e2a09339bb33711dd540ddbd'; // Put your API key here
var searchMethod;
var searchTerm;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log("Results from server: ", results);
	results = sortResults(results);
	console.log("Sorted results: ", results);
	for(var i = 0; i < results.length; i++) {
		var platforms = "";
		if (results[i].platforms) {
			for (var j = 0; j < results[i].platforms.length; j++) {
				platforms += results[i].platforms[j].name + ", ";
			}
			platforms = platforms.slice(0, platforms.length - 2);
		}
		var description = "";
		if (results[i].deck){
			description = results[i].deck;
		}
		var releaseDate = "";
		if (results[i].original_release_date){
			releaseDate = new Date (results[i].original_release_date).toLocaleDateString();}
		if (results[i].image){
			var image_url = results[i].image.icon_url;
		}
		$('.row').last().append("<div class='col-md-4 info'><h3>" + results[i].name + "</h3><img src='"+ image_url + "'><div class='result'>" + description + "<br> <strong>Release date:</strong> " + releaseDate +"<br> <strong>Platforms:</strong> "+ platforms + "</div> </div>");
		if (i % 3 == 0){
			$('.container').append("<div class='row'></div>");
		}
	}
	$('.info').on('click', function(){
		$('.result').hide();
		$(this).children('.result').show();

	});
}

//sort results array given a globally defined sort method keyword
function sortResults(results) {
	console.log("searchMethod is " + searchMethod);
	switch (searchMethod) {
		case "alpha":
			results = results.sort(alphaSort);
			console.log("Exiting alpha sort");
			break;
		case "release":
			results = results.sort(releaseSort);
			console.log("Exiting release sort");
			break;
		case "platform":
			results = results.sort(platformSort);
			console.log("Exiting platformSort");
			break;
	}
	return results;
}


function alphaSort(a, b) {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

function releaseSort(a,b){
	console.log("Entered release sort!")
	if (a.original_release_date < b.original_release_date) {
		console.log(a.original_release_date+" is greater than "+b.original_release_date);
		return -1;
	}
	if (a.original_release_date > b.original_release_date){
		console.log(a.original_release_date+" is less than "+b.original_release_date);
		return 1;
	}
	return 0;
}

$(document).ready(function() {

	$(".submit").on('click', function(){
		$(".container").empty();
		searchTerm = $("#searchTerm").val();
		console.log(searchTerm);
		$("#searchTerm").val('');
		search(searchTerm);
	});

	$("#alphaBtn").on('click', function(){
		if (searchTerm){
			console.log(searchTerm);
			$(".container").empty();
			searchMethod = "alpha";
			console.log("Set search method to "+searchMethod);
			search(searchTerm);
		} else {
			alert("Please enter a search!");
		}


	});

	$("#releaseBtn").on('click', function(){
		if (searchTerm){
			console.log(searchTerm);
			$(".container").empty();
			searchMethod = "release";
			console.log("Set search method to"+searchMethod);
			search(searchTerm);
		} else {
			alert("Please enter a search!");
		}


	})


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
