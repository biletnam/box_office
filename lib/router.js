Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('movies') ; }
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
  name: 'keywords',
  waitOn: function() { return Meteor.subscribe('keywords') ; }
});

Router.route('/keywords/:_id', {
  name: 'keywordPage',
  data: function() { return Keywords.findOne(this.params._id);},
  action: function () {
    // set the reactive state variable "postId" with a value
    // of the id from our url
    this.state.set('keywordId', this.params._id);
    this.render();
  }
 
});




