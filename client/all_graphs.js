buildActorGraph = function(actorGraphData)  {
    var movies = actorGraphData
    var movie_titles = []
    var production_budgets = []
    var total_domestic_grosses = []

    movies.forEach(function(movie) {
        var movie_title = movie.movie_title
        var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var production_budget = movie.production_budget * inflation_year.inflation_rate
        var total_domestic_gross = movie.domestic_box_office_total * inflation_year.inflation_rate
 
        movie_titles.push(movie_title)
        production_budgets.push(production_budget)
        total_domestic_grosses.push(total_domestic_gross)


     });

    $('#container_actor_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Movie Budget vs Total Domestic Gross'
        },
        xAxis: {
            categories: movie_titles
        },
        yAxis: [{
            min: 0,
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            opposite: false
        }],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Production Budget',
            color: 'rgba(248,161,63,1)',
            data: production_budgets,
            tooltip: {
                valuePrefix: '$',
                valueSuffix: ' M'
            },
            pointPadding: 0.3,
            yAxis: 1
        }, {
            name: 'Total Domestic Gross',
            color: 'rgba(186,60,61,.9)',
            data: total_domestic_grosses,
            tooltip: {
                valuePrefix: '$',
                valueSuffix: ' M'
            },
            pointPadding: 0.4,
            yAxis: 1
        }]
    });
};

buildFranchisePageGraph = function(movieData, div)  {
     var route = Router.current().route.getName()

	var movie_titles = []
	var production_budgets = []
	var total_domestic_grosses = []

	movieData.forEach(function(movie) {
  

		var movie_title = movie.movie_title
		var movie_release_year = movie.release_year
		var inflation_year = Years.findOne({year_int: movie_release_year})
		
		var production_budget = movie.production_budget * inflation_year.inflation_rate
		var total_domestic_gross = movie.domestic_box_office_total * inflation_year.inflation_rate
 

 
	
		movie_titles.push(movie_title)
		production_budgets.push(production_budget)
		total_domestic_grosses.push(total_domestic_gross)
	


     });

    $(div).highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: '',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: movie_titles,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },

        series: [{
            name: 'Production Budget',
            data: production_budgets,
            pointPlacement: 'on'
        }, {
            name: 'Total Domestic Gross',
            data: total_domestic_grosses,
            pointPlacement: 'on'
        }]

    });

};


buildArea = function(movies) {
    var areaChartCursor = movies
    var areaChartContext = "rating"
    var areaChartData = []
 
    areaChartCursor.forEach(function(movie) {
        var movieReleaseYear = movie.release_year
        var inflationYear = Years.findOne({year_int: movieReleaseYear})
        var inflationRate = inflationYear.inflation_rate
   

        
        var dataPoint = {
            releaseYear: movie.release_year,
            domesticBoxOfficeTotal: movie.domestic_box_office_total * inflationRate,
            rating: movie.rating,
            genre: movie.genre,
            productionMethod: movie.production_method


        };
        areaChartData.push(dataPoint);
    });

    var sqldData = alasql('SELECT releaseYear, rating, SUM(domesticBoxOfficeTotal) AS boxOfficeTotal FROM ? GROUP BY releaseYear, rating ORDER BY releaseYear, rating', [areaChartData]); 

    var preppedData =  _.chain(sqldData)
        .groupBy(areaChartContext)
        .map(function(value, key) {
        return {
            name: key,
            data: _.pluck(value, 'boxOfficeTotal'),
            year: _.pluck(value, 'releaseYear')
        }
        })
        .value();
        


    $('#container-area').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'MPAA Rating Distribution Over Time'
        },
        subtitle: {
        },
        xAxis: {
            categories: ['1995', 
            '1996', 
            '1997', 
            '1998', 
            '1999', 
            '2000', 
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014'
             ],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Percent'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
        series: preppedData
    });
};

buildMinMaxKeyword = function(minMaxData, minMaxCategories, keywordTitle) {


        $('#container-min-max').highcharts({

        chart: {
            type: 'columnrange',
            inverted: 'true'
        },

        title: {
            text: keywordTitle + ' Movie Gross Variation by Year'
        },

        subtitle: {
        },

        xAxis: {
            categories: minMaxCategories
        },

        yAxis: {
            title: {
                text: 'Total Domestic Gross'
            },
            min: 0
        },

        tooltip: {
            valueDecimals: 2
        },
     

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        return this.y;
                    }
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Range',
            data: minMaxData
        }]

    });
}



buildMonthlyAverageLine = function(movies) {

    var seriesData = []

   movies.forEach(function(movie) {
        var movieReleaseYear = movie.release_year
        var inflationYear = Years.findOne({year_int: movieReleaseYear})
        var inflationRate = inflationYear.inflation_rate
        var dataPoint = {
            releaseYear: movie.release_year,
            releaseMonth: movie.release_month,
            domesticBoxOfficeTotal: movie.domestic_box_office_total * inflationRate
        }; 
        seriesData.push(dataPoint);
    });



    var averagedData = alasql('SELECT releaseYear, releaseMonth, AVG(domesticBoxOfficeTotal) AS averageBoxOfficeTotal FROM ? GROUP BY releaseYear, releaseMonth ORDER BY releaseYear, releaseMonth', [seriesData]);  


    var stagingYear = _.groupBy(averagedData, 'releaseYear');



    var monthArray = _.pluck(averagedData, 'averageBoxOfficeTotal', 'releaseYear');




     finalData = []

    for (var key in stagingYear){
        finalData.push({name: key});

    }
   
    var groupedYear =  _.chain(averagedData)
        .groupBy('releaseYear')
        .map(function(value, key) {
        return {
            name: key,
            data: _.pluck(value, 'averageBoxOfficeTotal')
        }
        })
        .value();

    var finalLineData = groupedYear


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
        series: finalLineData
    });

};

buildScatter = function() {

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
                }
            }
        },

        series: all_chart_data

    });
};

