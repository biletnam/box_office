Template.actorGraph.helpers({
    movies: function() {

        var movies_data = Movies.find({}, {sort: {release_year: -1}})
        return movies_data
	}
});

function buildActorGraph()  {
	var movies = Session.get('actor_graph_session')
	var actor_graph_data = []
	console.log(movies)

	movies.forEach(function(movie) {
  
   
		var movie_title = movie.movie_title
   
		actor_graph_data.push(movie_title)

     });

     console.log(actor_graph_data)
    $('#container_actor_graph').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Efficiency Optimization by Branch'
        },
        xAxis: {
            categories: [
                'Seattle HQ',
                'San Francisco',
                'Tokyo'
            ]
        },
        yAxis: [{
            min: 0,
            title: {
                text: 'Employees'
            }
        }, {
            title: {
                text: 'Profit (millions)'
            },
            opposite: true
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
            data: [183.6, 178.8, 198.5],
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
            data: [203.6, 198.8, 208.5],
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