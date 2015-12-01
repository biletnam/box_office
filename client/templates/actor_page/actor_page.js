Template.actorPage.helpers({
    movies: function() {

        var movies_data = Movies.find({}, {sort: {release_year: -1}})
        return movies_data
	}
})