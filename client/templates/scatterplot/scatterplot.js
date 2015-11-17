function buildScatter() {

    var scatter_session_data = Session.get('scatterPlotData')
    var scatter_session_data2 = Session.get('scatterPlotData2')
    var year_1 = Session.get('selectedYearScatter')
    var year_2 = Session.get('selectedYearScatter2')
    var scatter_data = []
    var scatter_data2 = []


    scatter_session_data.forEach(function(movie) {
        var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var inflation_rate = inflation_year.inflation_rate
        var dataPoint = {
            x: movie.domestic_box_office_total * inflation_rate * .000001,
            y: movie.production_budget * inflation_rate * .000001,
            movie_title: movie.movie_title,
            release_year: movie.release_year

        };
        if (dataPoint.x > 1) {

            scatter_data.push(dataPoint);
        }
 
    });

    scatter_session_data2.forEach(function(movie) {
        var dataPoint = {
            x: movie.domestic_box_office_total * .000001,
            y: movie.production_budget * .000001,
            movie_title: movie.movie_title,
            release_year: movie.release_year

        };
        if (dataPoint.x > 1 ) {

            scatter_data2.push(dataPoint);
        }
 
    });



    var all_chart_data = [{name: year_1, data: scatter_data}, {name: year_2, data: scatter_data2}]

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
            text: 'Year Comparison'
        },
        legend: {
            enabled: true
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: 'Total Domestic Gross'
            },
            labels: {
                format: '{value}'
            },
            valuePrefix: '$',
   

        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Production Budget'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.2,

   
        },

        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.movie_title +'</b><br>' +
                'Production Budget: $' + Highcharts.numberFormat(this.y, 0) + ' million' + '<br>' +
                'Total Domestic Gross: $' + Highcharts.numberFormat(this.x, 0) + ' million'
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
  Session.set('selectedYearScatter', 1995)
  Session.set('selectedYearScatter2', 1996)
    this.autorun(function () { 
        var year = parseInt(Session.get('selectedYearScatter'))
        var year2 = parseInt(Session.get('selectedYearScatter2'))
        var movies = Movies.find({release_year: year}).fetch()
        var movies2 = Movies.find({release_year: year2}).fetch()
        Session.set('scatterPlotData', movies)
        Session.set('scatterPlotData2', movies2) 
        buildScatter()
    });

}

Template.scatterplot.events({
    "change #year_select_scatter": function(e) {
        var year = $("#year_select_scatter option:selected").text();
        Session.set('selectedYearScatter', year)
    },
    "change #year_select_scatter2": function(e) {
        var year2 = $("#year_select_scatter2 option:selected").text();
        Session.set('selectedYearScatter2', year2)
    }
})

