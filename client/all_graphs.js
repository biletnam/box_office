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
            // pointPlacement: 0.2,
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
            // pointPlacement: 0.2,
            yAxis: 1
        }]
    });
};

buildFranchisePageGraph = function(movieData)  {

	// var movies = Session.get('franchiseGraphSession')
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