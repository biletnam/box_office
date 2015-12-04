Template.franchisePageGraph.rendered = function() {  
    this.autorun(function () {  
    	var movieData = Movies.find({}, {sort: {release_year: 1}}).fetch()
    	var div = "#container_franchise_graph"
    	buildFranchisePageGraph(movieData, div)

    })
    
 
}