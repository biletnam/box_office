Template.movies.helpers({
  movies: function() {
    return Movies.find({release_month: 1}).count()
  }
});


Template.movies.topGenresChart = function() {
    var movies = Movies.find({release_year: 1995}).fetch()
    var seriesData = [];
    
    movies.forEach(function(movie) {
        var dataPoint = {
            genre: movie.genre, 
            domestic_gross: parseInt(movie.domestic_box_office_total)};
        seriesData.push(dataPoint);
    });
    
    console.log(seriesData)
    
    var gross = alasql('SELECT genre, SUM(domestic_gross) AS gross FROM ? GROUP BY genre', [seriesData]);    

    var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
    
    var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);    

    console.log(res); // [{"a":1,"b":40},{"a":2,"b":20}]
    
    console.log(gross[1]);

    final_data = []

    for (var i = 0; i < gross.length; i++) {


            final_data.push([gross[i].genre, gross[i].gross]);

   
    }

    console.log(final_data)

    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Year's top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: final_data
        }]
    };
};
