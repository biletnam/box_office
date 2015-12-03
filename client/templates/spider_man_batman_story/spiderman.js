Template.spiderMan.rendered = function() {  
    this.autorun(function () {  
    	var movieData = Movies.find({franchise:'Spider-Man'}, {sort: {release_year: 1}}).fetch()
    	buildFranchisePageGraph(movieData)

    })
    
 
}