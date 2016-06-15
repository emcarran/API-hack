$(document).ready(function () {

    // STEP 1 - get the input from the user
    "use strict";
    $('#search-terms').on('click', function (event) {
        event.preventDefault();
        var item = $('#all-items').val();
        var popular = $('#top-rated').val();
        searchValidate(item, popular);
    });
});

//add Validation(item, popular);

var searchValidate = function (item, popular) {
    "use strict";
    if ((item == '') && (popular == '')) {
        alert('please enter an item in the text box!');
        $('.item-details').html('');
        return false;
    } else {
        getItem(item, popular);
    }
}

// takes error string and turns it into displayable DOM element
var showError = function (error) {
    var errorElem = $('.error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
}

// takes a string of semi-colon separated tags to be searched
// for on Etsy
var getItem = function (item, popular) {
    var concatenatedUrl = 'https://openapi.etsy.com/v2/listings/active.js?keywords=' + item + '&limit=12&includes=Images:1&api_key=' + 'dk88st01cks0as9cv2iwr4hg';
    var result = $.ajax({
        url: concatenatedUrl,
        dataType: 'jsonp',
        //type: 'GET'
    })

    .done(function (result) {
        console.log(result);
        $('.item-details').html('');
        var itemResults = "";

        $.each(result.results, function (i, item) {

            itemResults += '<li>';
            itemResults += '<div class = "product-image">';
            itemResults += '<img src="' + item.Images[0].url_fullxfull + '" alt="item image" width="170">';
            itemResults += '</div>';
            itemResults += '<div class = "item-details">';
            itemResults += '<p>' + item.title + '</p>';
            itemResults += '<p> ' + item.description + '</p>';
            itemResults += '</div>';
            itemResults += '</li>';

            // itemResults += '<li><div class="product-image"><img src="' +
            // item.Images[0].url_fullxfull + '" alt="item image" width="170"></div><div
            // class="item-details"><p>' +
            // item.title + '</p><p> ' +
            // item.description + '</p></div></li>';

        });

        $('.item-details').append(itemResults);
    })

    .fail(function (error, errorThrown) {
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
    });

}
