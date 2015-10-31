Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('years'); }
});

Router.route('/', {name: 'years'});