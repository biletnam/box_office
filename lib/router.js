Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('movies'), Meteor.subscribe('keywords') ; }
});

Router.route('/', {
	loadingTemplate: 'loading',
	name: 'index'
});


Router.route('/pie', {
  name: 'movies'
});

Router.route('/scatterplot', {
  name: 'scatterplot'
});

Router.route('/line', {
  name: 'monthlyAverageLine'
});

Router.route('/area', {
  name: 'areaChart'
});

Router.route('/keywords', {
  name: 'keywords'
});




