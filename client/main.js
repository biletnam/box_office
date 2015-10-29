
  Meteor.call('getMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };


   
   for(var i=0;i<10;i++){
    Years.insert({
      year: result[i].year,
      top_grossing_movie_title: result[i].top_grossing_movie_title,
      top_grossing_movie_genre: result[i].top_grossing_movie_title,
      top_grossing_movie_production_budget: result[i].top_grossing_movie_production_budget,
      top_grossing_movie_gross: result[i].top_grossing_movie_gross
    })
  }

    Session.set("dataTable", result[i].year);
  });
  
Template.dataTable.helpers({
  rant: function () {
    return Session.get("dataTable")
  }
})

