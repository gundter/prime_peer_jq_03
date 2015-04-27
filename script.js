var apikey = '728618f4cc37c292e2a09339bb33711dd540ddbd'; // Put your API key here
var searchMethod;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
	//results = sortResults(results);
	for(var i = 0; i < results.length; i++) {
		var platforms = "";
		for(var j = 0; j < results[i].platforms.length; j++){
			platforms += results[i].platforms[j].name + ", ";
		}
		platforms = platforms.slice(0,platforms.length-2);
		var releaseDate = new Date (results[i].original_release_date).toLocaleDateString();
		if (results[i].image){
			var image_url = results[i].image.icon_url;
		}
		console.log(platforms);
		$('.container').append("<div class='col-md-4 info'><h3>" + results[i].name + "</h3><img src='"+ image_url + "'><div class='result'>" + results[i].deck + "<br> <strong>Release date:</strong> " + releaseDate +"<br> <strong>Platforms:</strong> "+ platforms + "</div> </div>");
		if (i % 3 == 0){
			$('.container').append("<div class='row'></div>");
		}
	}
	$('.info').on('click', function(){
		console.log("Click is working");
		$('.result').hide();
		$(this).children('.result').show();

	});
}

// sort results array given a globally defined sort method keyword
//function sortResults(results){
//	if (searchMethod == "alpha"){
//		results = results.sort(alphasort);
//			for (var k =0; k<results.length; k++){
//			console.log(results[k].name);}
//		}
//	}
//
//
//function alphaSort(a, b) {
//	if (a.name < b.name) {
//		return -1;
//	}
//	if (a.name > b.name) {
//		return 1;
//	}
//	return 0;
//}

$(document).ready(function() {

	$(".submit").on('click', function(){
		$(".container").empty();
		var searchTerm = $("#searchTerm").val();
		console.log(searchTerm);
		$("#searchTerm").val('');
		search(searchTerm);
	});

	//$(".btn").on(click, "#alphaBtn", function(){
	//	$(".container").empty();
	//	searchMethod = "alpha";
	//	search('batman');
	//})


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
