
function buildFranchisePageGraph(movieData)  {

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
            text: 'Budget vs spending',
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
            y: 70,
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

Template.franchisePageGraph.rendered = function() {  
    this.autorun(function () {  
    	var movieData = Movies.find({}, {sort: {release_year: 1}}).fetch()
    	// Session.set("franchiseGraphSession", franchiseGraphSession)
        // poop = Movies.find().count()
    	buildFranchisePageGraph(movieData)

    })
    
 
}