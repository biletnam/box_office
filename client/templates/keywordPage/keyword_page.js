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
       	var sqld_data = alasql('SELECT MAX(domestic_box_office_total) as max_bo, MIN(domestic_box_office_total) as min_bo FROM ? GROUP BY release_year ORDER BY release_year', [testData]); 


    console.log(sqld_data)
     // var apple =  _.chain(sqld_data)
     //    .groupBy('release_year')
     //    .map(function(value, key) {
     //    return { 
     //        data: [_.pluck(value, 'min_bo'), _.pluck(value, 'max_bo')]
     //    }
     //    })
     //    .value();
    var final_data = _.map(sqld_data, _.values)
    console.log(final_data)


        // console.log(atest)

        lol =  [
                [-9.7, 9.4],
                [-8.7, 6.5],
                [-3.5, 9.4],
                [-1.4, 19.9],
                [0.0, 22.6],
                [2.9, 29.5],
                [9.2, 30.7],
                [7.3, 26.5],
                [4.4, 18.0],
                [-3.1, 11.4],
                [-5.2, 10.4],
                [-13.5, 9.8]
            ]
            console.log(lol)

    });
    
 
}