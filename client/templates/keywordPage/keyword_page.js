Template.keywordPage.helpers({
    movies: function() {
    	var movies_data = Movies.find({keyword_array: {$in: [this.keyword]}}).fetch()
    	return movies_data
	}
})

Template.keywordPage.rendered = function() {  
    this.autorun(function () {  
    	var controller = Iron.controller();
    	var keyword_state = controller.state.get('keywordId');
		var keyword_title = Keywords.findOne(keyword_state)
		var movies_data = Movies.find({keyword_array: {$in: [keyword_title.keyword]}}).fetch()
		console.log(movies_data)
		testData = []
		movies_data.forEach(function(movie) {
  
   
		var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var inflation_rate = inflation_year.inflation_rate
   
        
        var dataPoint = {
            release_year: movie.release_year,
            domestic_box_office_total: movie.domestic_box_office_total * inflation_rate,
            movie_title: movie.movie_title


        };
        testData.push(dataPoint);
    });
    var years = _.pluck(testData, 'release_year');
    var categories = _.uniq(years)
       	var sqld_data = alasql('SELECT release_year, MAX(domestic_box_office_total), MIN(domestic_box_office_total) FROM ? GROUP BY release_year ORDER BY release_year', [testData]); 
       console.log(sqld_data)


    });
    
 
}