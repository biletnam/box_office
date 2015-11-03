
  // Meteor.startup(function () {
  //  var cheerio = Meteor.npmRequire('cheerio');

if (Years.find().count() > 20) {
  console.log('sup')
}
  

   Meteor.methods({
      getMovieData: function () {
        var cheerio = Meteor.npmRequire('cheerio');
           result = Meteor.http.get("http://www.the-numbers.com/movies/#tab=year")
        $ = cheerio.load(result.content);
        var year_increment 
        var category_increment = 1 
       var movie_data = []

        for (year_increment=8; year_increment<43; year_increment++) {
          var year = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(1)').text();
          var top_grossing_movie_title = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(3)').text();
          var top_grossing_movie_genre = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(4)').text();
          var top_grossing_movie_production_budget = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(5)').text();
          var top_grossing_movie_production_budget_clean = Number(top_grossing_movie_production_budget.replace(/[^0-9\.]+/g,""));
          var top_grossing_movie_gross = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(6)').text();
          var top_grossing_movie_gross_clean = Number(top_grossing_movie_gross.replace(/[^0-9\.]+/g,""));
          movie_data.push({year, top_grossing_movie_title, top_grossing_movie_genre, top_grossing_movie_production_budget_clean, top_grossing_movie_gross_clean})
        }
if (Years.find().count() === 0) {
      for(var i=0;i<30;i++){

      Years.insert({
      year: movie_data[i].year,
      top_grossing_movie_title: movie_data[i].top_grossing_movie_title,
      top_grossing_movie_genre: movie_data[i].top_grossing_movie_title,
      top_grossing_movie_production_budget: movie_data[i].top_grossing_movie_production_budget_clean,
      top_grossing_movie_gross: movie_data[i].top_grossing_movie_gross_clean
    })
  }
}
        return movie_data
}
});
// });


