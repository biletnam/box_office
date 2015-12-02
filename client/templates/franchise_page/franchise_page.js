Template.franchisePage.helpers({
	movies: function() {
   		var movies = Movies.find()
        return movies
	}
});
