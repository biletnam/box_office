function buildScatter() {
    var scatter_session_data = Session.get('scatterPlotData')
    var scatter_data = []

    console.log(scatter_session_data)

    scatter_session_data.forEach(function(movie) {
        var dataPoint = {
            x: movie.domestic_box_office_total,
            y: movie.production_budget,
            movie_title: movie.movie_title,
            release_year: movie.release_year

        };
        if (dataPoint.x > 1) {

            scatter_data.push(dataPoint);
        }
 
    });


    console.log(scatter_data)

    $('#container-scatter').highcharts({  
       
        chart: {
            type: 'scatter',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Sugar and fat intake per country'
        },

        subtitle: {
            text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: 'Daily fat intake'
            },
            labels: {
                format: '{value} gr'
            },

        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Daily sugar intake'
            },
            labels: {
                format: '{value} gr'
            },
            maxPadding: 0.2,
   
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th>{point.movie_title}</th></tr>' +
                '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
                '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
                '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                    // format: '{series.name}'
                }
            }
        },

        series: [{
            name: "Comedy",
            data: scatter_data
        }]

    });
};


Template.scatterplot.rendered = function() {  
    this.autorun(function () { 
        var movies = Movies.find({release_year: 2002}).fetch()
        Session.set('scatterPlotData', movies) 
        buildScatter()
    });

}
