Meteor.publish('movies', function() {
  return Movies.find();
});

Meteor.publish('allMovies', function(options) {
  check(options, {
    sort: Object, 
    limit: Number
  });
  return Movies.find({}, options);
});

Meteor.publish('allKeywords', function(options) {
  check(options, {
    sort: Object, 
    limit: Number
  });
  return Keywords.find({}, options);
});

Meteor.publish('years', function() {
  return Years.find();
});

Meteor.publish('allActors', function(options) {
  check(options, {
    sort: Object, 
    limit: Number
  });
  return Actors.find({}, options);
});

Meteor.publish('franchises', function(sort) {
  return Franchises.find({franchise_count: {$gt: 2}}, sort);
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

Meteor.publish('actorsMovies', function(id) {
  check(id, String)
  return Movies.find({actor_ids: {$in: [id]}});
});

Meteor.publish('actor', function(id) {
  check(id, String)
  return Actors.find(id);
});

Meteor.publish('moviesWithKeyword', function(id, sort) {
  return Movies.find({keyword_ids: {$in: [id]}}, sort);
});

Meteor.publish('topGrossingMoviesHome', function() {
  return Movies.find({}, {sort: {domestic_box_office_total: -1}, limit: 5});
});

Meteor.publish('topGrossingFranchisesHome', function() {
  return Franchises.find({}, {sort: {total_domestic_box_office: -1}, limit: 5});
});

Meteor.publish('topGrossingKeywordsHome', function() {
  return Keywords.find({}, {sort: {total_domestic_gross: -1}, limit: 5});
});

Meteor.publish('topGrossingActorsHome', function() {
  return Actors.find({}, {sort: {total_domestic_box_office: -1}, limit: 5});
});

Meteor.publish('franchiseMovies', function(id) {
  check(id, String)
  return Movies.find({franchise_id: id}, {sort: {release_year: 1}});
});



Meteor.publish('batman', function() {
  return Movies.find({franchise_id: "gKLy3NbXRnzmkrv7e"});
});

Meteor.publish('spider-man', function() {
  return Movies.find({franchise_id: "qkjFAdfX6PJHLaTbx"});
});











