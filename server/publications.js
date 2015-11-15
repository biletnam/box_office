Meteor.publish('movies', function() {
  return Movies.find();
});

Meteor.publish('years', function() {
  return Years.find();
});