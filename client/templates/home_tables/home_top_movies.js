Template.homeTopMovies.helpers({
	movies: function() {
   		var movies = Movies.find()
        return movies
	}
});