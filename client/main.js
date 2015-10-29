
  Meteor.call('getMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result[1].year);

    Years.insert({
      year: result[0].year,
      top_grossing_movie_title: result[0].top_grossing_movie_title,
      top_grossing_movie_genre: result[0].top_grossing_movie_title,
      top_grossing_movie_production_budget: result[0].top_grossing_movie_production_budget,
      top_grossing_movie_gross: result[0].top_grossing_movie_gross
    })

    Session.set("dataTable", result[1].year);
  });
  
Template.dataTable.helpers({
  rant: function () {
    return Session.get("dataTable")
  }
})

