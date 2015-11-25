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
  waitOn: function() { return Meteor.subscribe('keywords', {sort: {keyword_count: -1}}) ; },
  data: function() { 

    return {keywords: Keywords.find({}, {sort: {keyword_count: -1}})  }

  }
});




Router.route('/keywords/:_id', {
  name: 'keywordPage',
  waitOn: function() {
    return Meteor.subscribe('singleKeyword', this.params._id)
  },
  data: function() { return Keywords.findOne(this.params._id);},
  action: function () {

    this.state.set('keywordId', this.params._id);
    this.render();
  }
 
});




