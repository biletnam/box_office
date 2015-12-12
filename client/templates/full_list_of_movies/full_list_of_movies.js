Template.fullListOfMovies.rendered = function() {  
    this.autorun(function () {
      var route = Router.current().route.getName()
      if (route == 'alphaListOfMovies') {
         var state = 'Alphabetical (A-Z)'
      } else if (route == 'genreListOfMovies') {
         var state = 'Genre (A-Z)'
      } else if (route == 'ratingListOfMovies') {
         var state = 'Rating (A-Z)'
      } else {
        var state = 'Domestic Box Office (Highest First)'
      }
      
      Session.set('movieListDropDown', state)
    });

}




Template.fullListOfMovies.helpers({
  sort: function() {  
    var sort = Session.get('movieListDropDown')
    return sort
  }
});


Template.fullListOfMovies.events({
  'change #movie_sort_dropdown': function (e) {
    var route = $(event.target).val(); 
    Router.go(route)

  }
});
