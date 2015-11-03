Meteor.publish('years', function() {
	return Years.find();
})

Meteor.publish('movies', function() {
	return Movies.find();
})