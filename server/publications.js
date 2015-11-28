Meteor.publish('movies', function() {
  return Movies.find();
});

Meteor.publish('years', function() {
  return Years.find();
});

Meteor.publish('actors', function() {
  return Actors.find();
});


Meteor.publish('keywords', function(options) {
check(options, {
    sort: Object
  });
  return Keywords.find({}, options);
});

Meteor.publish('singleKeyword', function(id) {
  check(id, String)
  return Keywords.find(id);
});


Meteor.publish('singleMovie', function(id) {
  check(id, String)
  return Movies.find(id);
});

Meteor.publish('singleActor', function(id) {
  check(id, String)
  return Actors.find({movies: {$in: [id]}});
});

Meteor.publish('moviesWithKeyword', function(id) {
  check(id, String)
  return Movies.find({keyword_ids: {$in: [id]}}, {sort: {movie_title: 1}});
});