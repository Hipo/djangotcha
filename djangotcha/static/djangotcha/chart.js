$(function(){
    var token = GOTCHA_TOKEN;
    var application_id = GOTCHA_APP_ID;

    var gotcha_client = 'http://gotcha.hipo.biz'
    var app_base_url = gotcha_client + '/api/applications/' + application_id;

    var compiled = _.template('<% _.forEach(records, function(record) { %>  <tr><td><%= record.Time %></td> <td><%= record.StatusCode %></td> <td><%= record.DateCreated %></td></tr><% }); %>');
    
    $.get(app_base_url + '/urls/{{ url_id }}?token='+ token, function(response){
        var records = JSON.parse(response);
        // Ad this data to table
        $('.records').append((compiled({'records': records})))

        // Collect chart data
        chartData = []
        $.each(records, function(i, url_record){
            chartData[i] = [Date.parse(url_record["DateCreated"]), url_record["Time"]];
        });

        setTimeout(function(){
        $('#urlDetailChart').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Url Response Time Change Over Time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Response Time',
                data: chartData
            }]
        });
        }, 200);
    });
});