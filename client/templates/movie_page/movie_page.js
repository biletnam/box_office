Template.moviePage.helpers({
  actors: function() {  
    var actors = Actors.find()
    return actors
  }
})