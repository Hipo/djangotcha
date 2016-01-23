(function($){
    var token = Cookies.get('gotcha_token')
    $.get('/api/applications/{{.Id.Hex}}/urls?token='+ token, function(response){
        var urls = JSON.parse(response)
        var compiled = _.template('<% _.forEach(urls, function(url) { %>  <tr><td><%= url.Title %></td><td><A href=<%= url.Url %>><%= url.Url.substring(0, 50) %></a></td><td><%= url.Faster %></td><td><%= (url.Last * 1000).toFixed(3) %>ms</td></td><td><%= (url.Previous * 1000).toFixed(3)%>ms</td><td><%= url.Time %></td><td><%= url.Status %></td><td><button data-id="<%= url.Id %>" class=" remove glyphicon glyphicon-remove" aria-hidden="true"></button></td></tr><% }); %>');
        $('.urls').append((compiled({ 'urls': urls})));
        
        $('.remove').on('click', function(element){
            var removeUrlId = element.target.dataset.id
            
            $.ajax({
                url: '/api/applications/{{.Id.Hex}}/urls/' + removeUrlId + '/?token=' + token,
                type: 'DELETE',
                complete: function(){
                    window.location.reload()
                }
            });
        });
    });

    $('#fetchUrls').on('click', function(){
        $.get('/api/applications/{{.Id.Hex}}/fetch?token='+ token, function(response){
            window.location.reload()
        });
    });

    $('.submit-url').on('click', function(){
        var data = {"url": $('#url').val(), "title": $("#title").val()}
        
        $.ajax({
            url: '/api/applications/{{.Id.Hex}}/urls?token=' + token,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            complete: function(){

            }
        });

        $('.submit-callback').on('click', function(){
            var data = {"callbackurl": $('#callback-url').val()}
            $.ajax({
                url: '/api/applications/{{.Id.Hex}}/addcallback?token=' + token,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                complete: function(){

                }
            });
        });

        $.get('/api/applications/{{.Id.Hex}}/fetch?token='+ token, function(response){
            console.log('yay')
            window.location.reload()
        });
    });
})(jQuery);