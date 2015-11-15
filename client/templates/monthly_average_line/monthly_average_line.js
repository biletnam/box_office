function buildMonthlyAverageLine() {
    average_line_cursor = Session.get('averageLineData')

    var seriesData = []

    average_line_cursor.forEach(function(movie) {
        var dataPoint = {
            release_year: movie.release_year,
            release_month: movie.release_month,
            domestic_box_office_total: movie.domestic_box_office_total
        }; 
        seriesData.push(dataPoint);
    });



    var averaged_data = alasql('SELECT release_year, release_month, AVG(domestic_box_office_total) AS average_box_office_total FROM ? GROUP BY release_year, release_month ORDER BY release_year, release_month', [seriesData]);  


    var staging_year = _.groupBy(averaged_data, 'release_year');

    console.log(staging_year)

    var month_array = _.pluck(averaged_data, 'average_box_office_total', 'release_year');

    console.log(month_array)


     final_data = []

    for (var key in staging_year){
        final_data.push({name: key});

    }
    var list =  [{food: 'apple', type: 'fruit'},
                {food: 'potato', type: 'vegetable'},
                {food: 'banana', type: 'fruit'}]
   
    var apple =  _.chain(averaged_data)
        .groupBy('release_year')
        .map(function(value, key) {
        return {
            name: key,
            data: _.pluck(value, 'average_box_office_total')
        }
        })
        .value();
    console.log(apple)


   // var test = _.map(_.where(averaged_data, {release_year: 1995}),
   // function (data) {
   //      return { data.average_box_office_total,
   //      };
    
   //  });
    
    // console.log(staging_data)
    // console.log(test)

    $('#container-line').highcharts({



        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
};


Template.monthlyAverageLine.rendered = function() {  
    this.autorun(function () {  
        var movies = Movies.find().fetch()
        Session.set('averageLineData', movies)
        buildMonthlyAverageLine()
    });

}