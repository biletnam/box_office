Template.actorGraph.helpers({
    movies: function() {

        var movies_data = Movies.find({}, {sort: {release_year: -1}})
        return movies_data
	}
});

function buildActorGraph()  {
	var movies = Session.get('actor_graph_session')
	var movie_titles = []
	var production_budgets = []
	var total_domestic_grosses = []
	console.log(movies)

	movies.forEach(function(movie) {
  
   
		var movie_title = movie.movie_title
		var production_budget = movie.production_budget
		var total_domestic_gross = movie.domestic_box_office_total
   
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

Template.actorGraph.rendered = function() {  
    this.autorun(function () {  
    	var actor_graph_session = Movies.find({}, {sort: {release_year: 1}}).fetch()
    	Session.set("actor_graph_session", actor_graph_session)
    	buildActorGraph()

    })
    
 
}