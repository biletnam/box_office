Meteor.publish('movies', function() {
  return Movies.find();
});

Meteor.publish('years', function() {
  return Years.find();
});

Meteor.publish('keywords', function(limit) {
  return Keywords.find({}, {sort: {keyword_count:-1}});


});

