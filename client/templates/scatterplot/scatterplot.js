function buildScatter() {
    var scatter_session_data = Session.get('scatterPlotData')
    var scatter_data = []

 

    scatter_session_data.forEach(function(movie) {
        var dataPoint = {
            x: movie.domestic_box_office_total * .000001,
            y: movie.production_budget * .0001,
            movie_title: movie.movie_title,
            release_year: movie.release_year

        };
        if (dataPoint.x > 1) {

            scatter_data.push(dataPoint);
        }
 
    });

    var nodata = []

    var all_chart_data = [{name: "Comedy", data: scatter_data}, {name:'', data: nodata}]

    console.log(all_chart_data)

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
                format: '{value}'
            },
            valuePrefix: '$',
            valueDecimals: 0

        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Daily sugar intake'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.2,
            valuePrefix: '$',
            valueDecimals: 0
   
        },

        tooltip: {

            // pointFormat: '<tr><th>{point.movie_title}</th></tr><br>' +
            //     '<tr><th>Total Domestic BO:</th><td>{point.x}, {point.y}</td></tr><br>' +
            //     '<tr><th>Budget:</th><td>{point.x}, {point.y}</td></tr>',

            // followPointer: true,
            // valuePrefix: '$',
            // valueDecimals: 0
            formatter: function() {
                return '<b>'+ this.point.movie_title +'</b>';
}
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                    // format: '{series.name}'
                }
            }
        },

        series: all_chart_data

    });
};


Template.scatterplot.rendered = function() {  
    this.autorun(function () { 
        var movies = Movies.find({release_year: 1999}).fetch()
        Session.set('scatterPlotData', movies) 
        buildScatter()
    });

}
