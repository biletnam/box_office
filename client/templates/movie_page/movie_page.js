Template.moviePage.helpers({
  actors: function() {  
    var sort = Actors.find({}).count()
    return sort
    console.log(sort)
  }
})