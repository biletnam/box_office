Template.actorPage.helpers({
    movies: function() {

        var movies_data = Movies.find()
        return movies_data
	}
})