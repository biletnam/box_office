Template.actorGraph.helpers({
    movies: function() {

        var moviesData = Movies.find({}, {sort: {release_year: -1}})
        return moviesData
	}
});


Template.actorGraph.rendered = function() {  
    this.autorun(function () {  
    	var actorGraphData = Movies.find({}, {sort: {release_year: 1}}).fetch()
    	buildActorGraph(actorGraphData)

    })
    
 
}