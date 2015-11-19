function buildMonthlyAverageLine() {
    average_line_cursor = Session.get('averageLineData')
    var seriesData = []

    average_line_cursor.forEach(function(movie) {
        var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var inflation_rate = inflation_year.inflation_rate
        var dataPoint = {
            release_year: movie.release_year,
            release_month: movie.release_month,
            domestic_box_office_total: movie.domestic_box_office_total * inflation_rate
        }; 
        seriesData.push(dataPoint);
    });



    var averaged_data = alasql('SELECT release_year, release_month, AVG(domestic_box_office_total) AS average_box_office_total FROM ? GROUP BY release_year, release_month ORDER BY release_year, release_month', [seriesData]);  


    var staging_year = _.groupBy(averaged_data, 'release_year');



    var month_array = _.pluck(averaged_data, 'average_box_office_total', 'release_year');




     final_data = []

    for (var key in staging_year){
        final_data.push({name: key});

    }
   
    var apple =  _.chain(averaged_data)
        .groupBy('release_year')
        .map(function(value, key) {
        return {
            name: key,
            data: _.pluck(value, 'average_box_office_total')
        }
        })
        .value();

    var final_line_data = apple
    console.log(final_line_data)


   // var test = _.map(_.where(averaged_data, {release_year: 1995}),
   // function (data) {
   //      return { data.average_box_office_total,
   //      };
    
   //  });
    
    // console.log(staging_data)
    // console.log(test)

    $('#container-line').highcharts({



        title: {
            text: 'Monthly Average Gross by Year',
            x: -20 //center
        },
        subtitle: {
            text: '(Adjusted for Inflation)',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Average Gross (USD)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valuePrefix: '$',
            valueDecimals: 2
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: final_line_data
    });
    //     $('#button').click(function () {
    //     var chart = $('#container-line').highcharts();
    //         chart.series[0].remove();
    // });
};


Template.monthlyAverageLine.rendered = function() {  
    this.autorun(function () {  
        var movies = Movies.find().fetch()
        Session.set('averageLineData', movies)
        
        buildMonthlyAverageLine()
    });

}