Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
  // waitOn: function() { return Meteor.subscribe('movies') ; }
});

KeywordsController = RouteController.extend({
  template: 'keywords',
  findOptions: function() {
    // return {sort: {keyword_count: -1}}
    return {
      sort: this.sort
    }
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

KeywordPageController = RouteController.extend({
  template: 'keywordPage',
    findOptions: function() {
    // return {sort: {keyword_count: -1}}
    // return {sort: this.sort}
  },
    waitOn: function() {
    return [Meteor.subscribe('singleKeyword', this.params._id), Meteor.subscribe('moviesWithKeyword', this.params._id), Meteor.subscribe('years')]
  },
  data: function() { return Keywords.findOne(this.params._id);},
  action: function () {

    this.state.set('keywordId', this.params._id);
    this.render();
  }

});

TopGrossingMovieController = KeywordPageController.extend({

})

AlphaKeywordMovieController = KeywordPageController.extend({

})

RatingKeywordMovieController = KeywordPageController.extend({

})

GenreKeywordMovieController = KeywordPageController.extend({

})


Router.route('/keywords/:_id', {
  name: 'topGrossingMovie'
});

Router.route('/keywords/:_id/alpha', {
  name: 'alphaKeywordMovie'
});

Router.route('/keywords/:_id/rating', {
  name: 'ratingKeywordMovie'
});

Router.route('/keywords/:_id/genre', {
  name: 'genreKeywordMovie'
});


Router.route('/actor/:_id', {
  name: 'actorPage',
  template: 'actorPage',
  waitOn: function() {
    return [Meteor.subscribe('actorsMovies', this.params._id), Meteor.subscribe('actor', this.params._id), Meteor.subscribe('years')]
  },
  data: function() { return Actors.findOne(this.params._id);},

  

});

Router.route('/allmovies', {
  name: 'fullListOfMovies',
  template: 'fullListOfMovies',
  waitOn: function() {
    return [Meteor.subscribe('movies')]
  }
  

});

Router.route('/topgrossingmovies', {
  name: 'topGrossingMovies',
  template: 'topGrossingMovies',
  waitOn: function() {
    return [Meteor.subscribe('topGrossingMovies')]
  }
});


Router.route('/franchises', {
  name: 'fullListOfFranchises',
  template: 'fullListOfFranchises',
  waitOn: function() {
    return Meteor.subscribe('franchises')
  }
});

Router.route('/franchise/:_id', {
  name: 'franchisePage',
  template: 'franchisePage',
  waitOn: function() {
    return [Meteor.subscribe('franchiseMovies', this.params._id), Meteor.subscribe('years')]
  },
  data: function() { return Movies.findOne(this.params._id);},

  

});




