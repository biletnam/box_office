Meteor.subscribe('years')

if (Years.find().count() === 0) {
  Meteor.call('getMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };
    

   
  //  for(var i=0;i<30;i++){
  //   Years.insert({
  //     year: result[i].year,
  //     top_grossing_movie_title: result[i].top_grossing_movie_title,
  //     top_grossing_movie_genre: result[i].top_grossing_movie_title,
  //     top_grossing_movie_production_budget: result[i].top_grossing_movie_production_budget_clean,
  //     top_grossing_movie_gross: result[i].top_grossing_movie_gross_clean
  //   })
  // }
  console.log(result[5])



});
}

// Meteor.call('seedAnnualTopGrossing', function(error, data) {
//   if (error) {
//     console.log('error', error);
//   };

//   console.log(data)
//   // Session.set("dataTable", data)

// });

Meteor.call('getIndividualMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result)
    
});
  


