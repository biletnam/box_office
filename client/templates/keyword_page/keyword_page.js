Template.keywordPage.helpers({
    movies: function() {
        var sortSession = Session.get('keyword_page_dropdown')
        if (sortSession == 'Alphabetical (A-Z)') {
           var sort = {sort: {movie_title: 1}}
        } else if (sortSession == 'Genre (A-Z)') {
            var sort = {sort: {genre: 1}}
        } else if (sortSession == 'Rating (A-Z)') {
            var sort = {sort: {rating: 1}}
        } else {
            var sort = {sort: {domestic_box_office_total: -1}}
        }
        var moviesData = Movies.find({keyword_ids: {$in: [this._id]}}, sort)
        return moviesData
	},
    sort: function() {
         var sort = Session.get('keyword_page_dropdown')
         return sort
    }
})

Template.keywordPage.rendered = function() {  
    this.autorun(function () {  
        var route = Router.current().route.getName()
        
        if (route == 'alphaKeywordMovie') {
            var state = 'Alphabetical (A-Z)'
        } else if (route == 'genreKeywordMovie') {
            var state = 'Genre (A-Z)'
        } else if (route == 'ratingKeywordMovie') {
            var state = 'Rating (A-Z)'
        } else {
            var state = 'Box Office Gross (Highest First)'
        }
            Session.set('keyword_page_dropdown', state)

        var controller = Iron.controller();
    	var keywordState = controller.state.get('keywordId');
		var keywordTitle = Keywords.findOne(keywordState)
		var moviesData = Movies.find({keyword_array: {$in: [keywordTitle.keyword]}}).fetch()

		testData = []
		moviesData.forEach(function(movie) {
  
   
		var movieReleaseYear = movie.release_year
        var inflationYear = Years.findOne({year_int: movieReleaseYear})
        var inflationRate = inflationYear.inflation_rate 
   
        
        var dataPoint = {
            releaseYear: movie.release_year,
            domesticBoxOfficeTotal: movie.domestic_box_office_total * inflationRate,
            movieTitle: movie.movie_title


        };
        testData.push(dataPoint);
    });
    var years = _.pluck(testData, 'releaseYear');

    var categories = _.uniq(years)
    var sqldData = alasql('SELECT releaseYear, MIN(domesticBoxOfficeTotal) as minBo, MAX(domesticBoxOfficeTotal) as maxBo FROM ? GROUP BY releaseYear ORDER BY releaseYear ASC', [testData]); 
    var finalYears = _.sortBy(categories, function(num) {
        return num
    })

    var finalData = _.map(sqldData, _.values)

    var keywordGraphTitle = keywordTitle.keyword

    buildMinMaxKeyword(finalData, finalYears, keywordGraphTitle)
    
    });
    
 
}

Template.keywordPage.events({
  'change #keyword_sort_movie_dropdown': function (e) {
    var route = $(event.target).val();
    Router.go(route, {_id: this._id})

  }
});







