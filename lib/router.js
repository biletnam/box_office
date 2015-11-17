Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('movies'); }
});

Router.route('/', {
	loadingTemplate: 'loading',
	name: 'areaChart',
	template: 'areaChart'


});

