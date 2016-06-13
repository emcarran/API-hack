(function ($) {

    $(document).ready(function () {

        // STEP 1 - get the input from the user

        $("#search-button").bind('submit', function () {
            api_key = "AIzaSyCEKVSeuST3PwfJFcF7OmuKJYGSpKD99y4";
            var item = $('#all-items').val();
            var popular = $('#top-rated').val();
            etsyUrl = 'http://openapi.etsy.com/v2/listings/active.js?keywords=' + item + '&limit=12&includes=Images:1&api_key=' + top - rated + '&limit=12&includes=Images:1&api_key=' + api_key;

            //searchValidation(item, popular);

            $('#item-details').empty();
            $('<p></p>').text('searching for ' + item).appendTo('#item-details');
            $('<p></p>').text('searching for ' + popular).appendTo('#item-details');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function (data) {
                    if (data.ok) {
                        $('#item-details').empty();
                        if (data.count > 0) {
                            $.each(data.results, function (i, item) {
                                $("<img/>").attr("src", item.Images[0].url_75x75).appendTo('#item-details').wrap(
                                    "<a href = '" + item.url + "'></a>"
                                );
                                if (i % 4 == 3) {
                                    $('<br/>').appendTo('#item-details');
                                }
                            });
                        } else {
                            $('<p>No result.</p>').appendTo('#item-details');
                        }
                    } else {
                        $('#item-details').empty();
                        alert(data.error);
                    }
                }
            });
            return false;
        })
    });

})(jQuery);
