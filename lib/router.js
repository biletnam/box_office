Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
	loadingTemplate: 'loading',
	name: 'movies',
	template: "movies",
	subscriptions: function() {
    	this.subscribe('movies').wait();
	},
	data: function () {
      return Movies.find();
    }

});

