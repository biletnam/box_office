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

buildFranchisePageGraph = function(movieData)  {


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

    $('#container_franchise_graph').highcharts({

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