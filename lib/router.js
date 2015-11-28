Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
  // waitOn: function() { return Meteor.subscribe('movies') ; }
});

KeywordsController = RouteController.extend({
  template: 'keywords',
  findOptions: function() {
    // return {sort: {keyword_count: -1}}
    return {sort: this.sort}
  },
  waitOn: function() { 
    return Meteor.subscribe('keywords', this.findOptions()); 
  },
  data: function() { 

    return {keywords: Keywords.find({}, this.findOptions())  }

  }

});

TopGrossingController = KeywordsController.extend({
  sort: {total_domestic_gross: -1},
});

MostMoviesController = KeywordsController.extend({
  sort: {keyword_count: -1},
});

AlphabeticalKeywordsController = KeywordsController.extend({
  sort: {keyword: 1},
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
  name: 'topGrossing'
});

Router.route('/keywords/mostmovies', {
  name: 'mostMovies'
});

Router.route('/keywords/alphabetical', {
  name: 'alphabeticalKeywords'
});


Router.route('/movie/:_id', {
  name: 'moviePage',
  template: 'moviePage',
  waitOn: function() {
    return [Meteor.subscribe('singleMovie', this.params._id), Meteor.subscribe('singleActor', this.params._id)]
  },
  
  data: function() { 
    return Movies.findOne(this.params._id) 
},

  

});






// Router.route('/keywords/:_id', {
//   name: 'keywordPage',
//   waitOn: function() {
//     return Meteor.subscribe('singleKeyword', this.params._id)
//   },
//   data: function() { return Keywords.findOne(this.params._id);},
//   action: function () {

//     this.state.set('keywordId', this.params._id);
//     this.render();
//   }
 
// });

KeywordPageController = RouteController.extend({
  template: 'keywordPage',
    waitOn: function() {
    return Meteor.subscribe('singleKeyword', this.params._id)
  },
  data: function() { return Keywords.findOne(this.params._id);},
  findOptions: function() {
    return {sort: this.sort}
  },
  action: function () {

    this.state.set('keywordId', this.params._id);
    this.render();
  }

});

TopGrossingMovieController = KeywordPageController.extend({
  sort: {rating: -1}
})

Router.route('/keywords/:_id', {
  name: 'topGrossingMovie'
});







