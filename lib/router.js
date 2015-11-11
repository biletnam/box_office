Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('movies'); }
});

Router.route('/', {
	name: 'movies',
	waitOn: function() { return Meteor.subscribe('movies'); }
});

