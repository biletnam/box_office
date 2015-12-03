Template.actorPage.helpers({
    movies: function() {

        var moviesData = Movies.find({}, {sort: {release_year: -1}})
        return moviesData
	}
})