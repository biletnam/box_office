Template.movies.helpers({
  movies: function() {
    return Movies.find().count()
  }
});



Template.movies.events({
    "click .tab": function() {
        word = $(".active").text();

        Session.set('selectedYear', word)
    }
})

function builtPie() {
    Session.get('selectedYear')
    Session.get('movie_pie_data')
    var movie_pie_data = Session.get('movie_pie_data')
    console.log(movie_pie_data)

        var seriesData = [];
    
    movie_pie_data.forEach(function(movie) {
        var dataPoint = {
            genre: movie.genre, 
            domestic_gross: parseInt(movie.domestic_box_office_total)};
        seriesData.push(dataPoint);
    });
    
    console.log(seriesData)


    var gross = alasql('SELECT genre, SUM(domestic_gross) AS gross FROM ? GROUP BY genre ORDER BY gross DESC', [seriesData]);    
    
    console.log(gross[1]);

    final_data = []

    for (var i = 0; i < gross.length; i++) {


            final_data.push([gross[i].genre, gross[i].gross]);

   
    }

    console.log(final_data)

    $('#container-pie').highcharts({

        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: this.username + "'s top genres"
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
    })
}

Template.movies.rendered = function() {  
    this.autorun(function () {  
        Session.get('selectedYear')
        var year = Session.get('selectedYear')
        var pie_year = parseInt(year)
        var movies = Movies.find({release_year: pie_year}).fetch()
        Session.set('movie_pie_data', movies)
        builtPie();
    });

}


