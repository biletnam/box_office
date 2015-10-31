Meteor.publish('years', function() {
	return Years.find();
})