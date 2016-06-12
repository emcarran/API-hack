$(function () {

// STEP 1 - get the input from the user

$("#search-button").submit(function (event) {
event.preventDefault();
getResults($('#search').val());
});

// STEP 2 - using the input from the user (query) make the API call to get the JSONP response



function (data) {
// If there are no results,, the list will just come back empty
if (data.pageInfo.totalResults == 0) {
alert("No results found!");
}

//if there are results, call the displaySearchResults
displaySearchResults(data.items);

});
}






  // STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON

function displaySearchResults(videos) {
var buildTheHtmlOutput = "";

$.each(videos, function (index, video) {
//concatenate the results inside the HTML variable
buildTheHtmlOutput += "<li><p>" + video.snippet.title + "</p><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><img src='" + video.snippet.thumbnails.high.url + "'/></a></li>";
});

//use the HTML output to show it in the index.html
$("#search-results ul").html(buildTheHtmlOutput);
}
});
