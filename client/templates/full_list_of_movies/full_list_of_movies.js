Template.fullListOfMovies.helpers({
	movies: function() {
   		var moviesData = Movies.find({}, {sort: {movie_title: 1}})
        return moviesData
	}
});