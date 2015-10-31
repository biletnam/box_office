
  Meteor.startup(function () {
   var cheerio = Meteor.npmRequire('cheerio');



   Meteor.methods({
     //  getMovieData: function () {
     //    result = Meteor.http.get("http://www.the-numbers.com/movies/#tab=year")
     //    $ = cheerio.load(result.content);
     //    var year_increment 
     //    var category_increment = 1 
    	// var movie_data = []

     //    for (year_increment=8; year_increment<43; year_increment++) {
     //   		var year = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(1)').text();
     //   		var top_grossing_movie_title = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(3)').text();
     //   		var top_grossing_movie_genre = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(4)').text();
     //   		var top_grossing_movie_production_budget = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(5)').text();
     //   		var top_grossing_movie_gross = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(6)').text();
     //   		movie_data.push({year, top_grossing_movie_title, top_grossing_movie_genre, top_grossing_movie_production_budget, top_grossing_movie_gross})
     //   	}

     //    return movie_data;
     //  },
      seedAnnualTopGrossing: function () {
      	var year
      	var counter
      	var data = []
      	
      	for (year=1995; year<1998; year++) {
      	var result = Meteor.http.get("http://www.the-numbers.com/market/" + year + "/top-grossing-movies")
      	$ = cheerio.load(result.content);
      		for (counter=2; counter<10; counter++) {
      		var title = $("table > tr:nth-child(" + counter  + ") >td:nth-child(2)").text();
     //  	var release_date = $('table > tr:nth-child(2) >td:nth-child(3)').text();
    	// var gross_in_year =  $('table > tr:nth-child(2) >td:nth-child(7)').text(); 	
     //  	var title_url = title.replace(/\s+/g, '-').toLowerCase();
     //  	var clean_title_url = title_url.replace(/\.|:/g,'')
   
     //  	var page_view = Meteor.http.get("http://www.the-numbers.com/movie/" + clean_title_url + "#tab=summary")
     //  	$ = cheerio.load(page_view.content);
     //  	var production_budget = $('#summary > p > table > tr:nth-child(1) > td:nth-child(2)').text();
     //  	var keywords = $('#summary > p > table > tr:nth-child(8) > td:nth-child(2)').text();
     //  	var keywords_array = keywords.split(', ') 
      	data.push({title})
      }
      }

      return data
      }
   })
  });


