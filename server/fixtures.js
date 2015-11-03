
 //  Meteor.startup(function () {
 //   var cheerio = Meteor.npmRequire('cheerio');
 // })

  

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
},

 seedAnnualTopGrossing: function () {
  var cheerio = Meteor.npmRequire('cheerio');
         var year
       var counter
       var data = []
        
       for (year=1995; year<1998; year++) {
          var result = Meteor.http.get("http://www.the-numbers.com/market/" + year + "/top-grossing-movies")
          $ = cheerio.load(result.content);
        for (counter=2; counter<25; counter++) {
        var movie_title = $("table > tr:nth-child(" + counter  + ") >td:nth-child(2)").text();
        var release_date = $("table > tr:nth-child(" + counter + ") >td:nth-child(3)").text();
        var release_year = release_date.slice(-4);
        var release_year_int = parseInt(release_year)
        var calendar_year = year
        var distributor = $("table > tr:nth-child(" + counter + ") >td:nth-child(4)").text();
        var genre = $("table > tr:nth-child("+ counter + ") >td:nth-child(5)").text();
        var rating = $("table > tr:nth-child("+ counter +") >td:nth-child(6)").text();
        var gross_in_year =  $("table > tr:nth-child(" + counter + ") >td:nth-child(7)").text();
        var tickets_sold = $("table > tr:nth-child(" + counter + ") >td:nth-child(8)").text();
        var title_url = movie_title.replace(/\s+/g, '-').toLowerCase();
        var clean_title_url = title_url.replace(/\.|:|/g,'')
        var super_clean_url = clean_title_url.replace('&', 'and');
   
        // var page_view = Meteor.http.get("http://www.the-numbers.com/movie/" + clean_title_url + "#tab=summary")
        // $ = cheerio.load(page_view.content);
        // var production_budget = $('#summary > p > table > tr:nth-child(1) > td:nth-child(2)').text();
        // var keywords = $('#summary > p > table > tr:nth-child(8) > td:nth-child(2)').text();
        // var keywords_array = keywords.split(', ') 
          
          data.push({movie_title, release_date, release_year_int, distributor, genre, rating, gross_in_year, tickets_sold, clean_title_url, super_clean_url})
        
      }

    }
    return data
  }
});
        





