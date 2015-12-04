Template.batman.rendered = function() {  
    this.autorun(function () {  
    	var movieData = Movies.find({franchise:'Batman'}, {sort: {release_year: 1}}).fetch()
    	var div = "#container_franchise_graph"
    	buildFranchisePageGraph(movieData, div)

    })
    
 
}