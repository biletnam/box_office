Template.fullListOfMovies.helpers({
	movies: function() {
   		var movies_data = Movies.find({}, {sort: {movie_title: 1}})
        return movies_data
	}
});