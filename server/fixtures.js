
  Meteor.startup(function () {
   var cheerio = Meteor.npmRequire('cheerio');



   Meteor.methods({
      getMovieData: function () {
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
       		var top_grossing_movie_gross = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(6)').text();
       		movie_data.push({year, top_grossing_movie_title, top_grossing_movie_genre, top_grossing_movie_production_budget, top_grossing_movie_gross})
       	}

        return movie_data;
      }
   })
  });


