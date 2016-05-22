(function($){
    var token = GOTCHA_TOKEN;
    var application_id = GOTCHA_APP_ID;

    var gotcha_client = 'http://gotcha.hipo.biz'
    var app_base_url = gotcha_client + '/api/applications/' + application_id;

    $.get('http://crossorigin.me/' + app_base_url + '/urls?token='+ token, function(response){
        var urls = JSON.parse(response);
        //<a href="/applications/56a37dbd2cd1700e04ee9d84/urls/56a393ad2cd170528b31410a">naber</a>
        var compiled = _.template('<% _.forEach(urls, function(url) { %>  <tr><td><a href="<%= url.Id %>"><%= url.Title %></a></td><td><A href=<%= url.Url %>><%= url.Url.substring(0, 50) %></a></td><td><%= url.Faster %></td><td><%= (url.Last * 1000).toFixed(3) %>ms</td></td><td><%= (url.Previous * 1000).toFixed(3)%>ms</td><td><%= url.Time %></td><td><%= url.Status %></td><td><button data-id="<%= url.Id %>" class=" remove glyphicon glyphicon-remove" aria-hidden="true"></button></td></tr><% }); %>');

        $('.urls').append((compiled({ 'urls': urls})));
        
        $('.remove').on('click', function(element){
            var removeUrlId = element.target.dataset.id

            $.ajax({
                url: gotcha_client + '/urls/' + removeUrlId + '/?token=' + token,
                type: 'DELETE',
                complete: function(){
                    window.location.reload();
                }
            });
        });
    });

    $('#fetchUrls').on('click', function(){
        $.get('http://crossorigin.me/' + app_base_url + '/fetch?token='+ token, function(response){
            window.location.reload();
        });
    });

    $('.submit-url').on('click', function(){
        debugger;
        var data = {"url": $('#url').val(), "title": $("#title").val()}

        $.ajax({
            url: app_base_url + '/urls?token=' + token,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            complete: function(response){

            }
        });

        $('.submit-callback').on('click', function(){
            var data = {"callbackurl": $('#callback-url').val()}
            $.ajax({
                url: app_base_url + '/addcallback?token=' + token,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                complete: function(){

                }
            });
        });

        $.get('http://crossorigin.me/' + app_base_url + '/fetch?token='+ token, function(response){
            window.location.reload();
        });
    });
})(jQuery);

