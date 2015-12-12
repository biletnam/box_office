Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});



FullListOfActorsController = RouteController.extend({
  template: 'fullListOfActors',
  increment: 50,
  actorsLimit: function() {
    return parseInt(this.params.actorsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.actorsLimit()}
  },
  subscriptions: function() {
    this.actorsSub = Meteor.subscribe('allActors', this.findOptions());
  },
  actors: function() {
    return Actors.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.actors().count() === this.actorsLimit();
    var nextPath = this.route.path({actorsLimit: this.actorsLimit() + this.increment})
    return {
      actors: this.actors(),
      ready: this.actorsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.route('/actors/:actorsLimit?', {
  name: 'grossingListOfActors'
});

Router.route('/actorsalpha/:actorsLimit?', {
  name: 'alphaListOfActors'
});


GrossingListOfActorsController = FullListOfActorsController.extend({
  sort: {total_domestic_box_office: -1}
});

AlphaListOfActorsController = FullListOfActorsController.extend({
  sort: {actor: 1}
});


FranchisesController = RouteController.extend({
  template: 'fullListOfFranchises',
  findOptions: function() {
    return {
      sort: this.sort
    }
  },
  waitOn: function() { 
    return Meteor.subscribe('franchises', this.findOptions()); 
  },
  data: function() { 

    return {franchises: Franchises.find({franchise_title: {$not: ""}}, this.findOptions())  }

  }

});

FullListOfFranchisesController = FranchisesController.extend({
  sort: {total_domestic_box_office: -1}
});

AlphaFullListOfFranchisesController = FranchisesController.extend({
  sort: {franchise_title: 1}
});

CountFullListOfFranchisesController = FranchisesController.extend({
  sort: {franchise_count: -1}
});


Router.route('/franchises', {
  name: 'fullListOfFranchises'
});

Router.route('/franchisesalpha', {
  name: 'alphaFullListOfFranchises'
});

Router.route('/franchisescount', {
  name: 'countFullListOfFranchises'
});


KeywordsController = RouteController.extend({
  template: 'keywords',
  findOptions: function() {
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
	name: 'index', 
  waitOn: function() {
    return [Meteor.subscribe('topGrossingMoviesHome'), 
    Meteor.subscribe('topGrossingFranchisesHome'), 
    Meteor.subscribe('topGrossingKeywordsHome'), 
    Meteor.subscribe('topGrossingActorsHome')]
  }
});


Router.route('/pie', {
  name: 'movies',
  template: 'movies',
  waitOn: function() {
    return [Meteor.subscribe('movies')]
  }
});

Router.route('/scatterplot', {
  name: 'scatterplot',
  template: 'scatterplot',
  waitOn: function() {
    return [Meteor.subscribe('movies'), Meteor.subscribe('years')]
  }
});

Router.route('/line', {
  name: 'monthlyAverageLine',
  template: 'monthlyAverageLine',
  waitOn: function() {
    return [Meteor.subscribe('movies'), Meteor.subscribe('years')]
  }

});

Router.route('/area', {
  name: 'areaChart',
  template: 'areaChart',
  waitOn: function() {
    return [Meteor.subscribe('movies'), Meteor.subscribe('years')]
  }
});

Router.route('/keywords', {
  name: 'topGrossing',
  template: 'keywords',
  waitOn: function() {
    return [Meteor.subscribe('movies'), Meteor.subscribe('years')]
  }

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
    return {sort: this.sort}
  },
    waitOn: function() {
    return [Meteor.subscribe('singleKeyword', this.params._id), Meteor.subscribe('moviesWithKeyword', this.params._id), Meteor.subscribe('years')]
  },
  data: function() { 
    return Keywords.findOne(this.params._id)
  },
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

// Router.route('/allmovies', {
//   name: 'fullListOfMovies',
//   template: 'fullListOfMovies',
//   waitOn: function() {
//     return [Meteor.subscribe('movies')]
//   }
  

// });

Router.route('/topgrossingmovies', {
  name: 'topGrossingMovies',
  template: 'topGrossingMovies',
  waitOn: function() {
    return [Meteor.subscribe('topGrossingMovies')]
  }
});

// MoviesController = RouteController.extend({
//   template: 'fullListOfMovies',
//   findOptions: function() {
//     return {
//       sort: this.sort
//     }
//   },
//   waitOn: function() { 
//     return [Meteor.subscribe('movies')]; 
//   }

// });


// FullListOfMoviesController = MoviesController.extend({

// })

// Router.route('/allmovies/:moviesLimit?', {
//   template: 'fullListOfMovies',
//   name: 'fullListOfMovies',
//   waitOn: function() {
//     var limit = parseInt(this.params.moviesLimit) || 100;
//     return Meteor.subscribe('allMovies', {sort: {movie_title: -1}, limit: limit})
//   },
//   data: function() {
//     var limit = parseInt(this.params.moviesLimit) || 100;
//     return {
//       movies: Movies.find({}, {sort: {movie_title: -1}, limit:limit})
//     }
//   }
// });

FullListOfMoviesController = RouteController.extend({
  template: 'fullListOfMovies',
  increment: 50,
  moviesLimit: function() {
    return parseInt(this.params.moviesLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.moviesLimit()}
  },
  subscriptions: function() {
    this.moviesSub = Meteor.subscribe('allMovies', this.findOptions());
  },
  movies: function() {
    return Movies.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.movies().count() === this.moviesLimit();
    var nextPath = this.route.path({moviesLimit: this.moviesLimit() + this.increment})
    return {
      movies: this.movies(),
      ready: this.moviesSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

AlphaListOfMoviesController = FullListOfMoviesController.extend({
  sort: {movie_title: 1},
});

RatingListOfMoviesController = FullListOfMoviesController.extend({
  sort: {rating: 1},
});

GenreListOfMoviesController = FullListOfMoviesController.extend({
  sort: {genre: 1},
});

GrossingListOfMoviesController = FullListOfMoviesController.extend({
  sort: {domestic_box_office_total: -1},
});


Router.route('/allmovies/:moviesLimit?', {
  name: 'alphaListOfMovies'
});

Router.route('/allmoviesrating/:moviesLimit?', {
  name: 'ratingListOfMovies'
});

Router.route('/allmoviesgenre/:moviesLimit?', {
  name: 'genreListOfMovies'
});

Router.route('/allmoviesgrossing/:moviesLimit?', {
  name: 'grossingListOfMovies'
});







// Router.route('/franchises', {
//   name: 'fullListOfFranchises',
//   template: 'fullListOfFranchises',
//   waitOn: function() {
//     return Meteor.subscribe('franchises')
//   }
// });

Router.route('/franchise/:_id', {
  name: 'franchisePage',
  template: 'franchisePage',
  waitOn: function() {
    return [Meteor.subscribe('franchiseMovies', this.params._id), Meteor.subscribe('years'), Meteor.subscribe('franchises')]
  },
  data: function() { return Franchises.findOne(this.params._id);},

  

});

Router.route('/batmanSpiderMan', {
  name: 'batmanSpiderMan',
  template: 'batmanSpiderMan',
  waitOn: function() {
    return [Meteor.subscribe('franchiseMovies', "gKLy3NbXRnzmkrv7e"),Meteor.subscribe('franchiseMovies', "qkjFAdfX6PJHLaTbx"), Meteor.subscribe('years')]
  }
});




