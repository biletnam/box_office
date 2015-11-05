Meteor.methods({
  getMovieData: function () {
    var cheerio = Meteor.npmRequire('cheerio');
    result = Meteor.http.get("http://www.the-numbers.com/movies/#tab=year")
    $ = cheerio.load(result.content);
    
    var year_increment 
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
        
  for (year=1995; year<1996; year++) {
    var result = Meteor.http.get("http://www.the-numbers.com/market/" + year + "/top-grossing-movies")
    $ = cheerio.load(result.content);
      for (counter=2; counter<102; counter++) {
        var movie_title = $("table > tr:nth-child(" + counter  + ") >td:nth-child(2)").text();
        console.log(movie_title)
        var release_date = $("table > tr:nth-child(" + counter + ") >td:nth-child(3)").text();
        var release_year = release_date.slice(-4);
        var release_year_int = parseInt(release_year)
        var calendar_year = year
        var distributor = $("table > tr:nth-child(" + counter + ") >td:nth-child(4)").text();
        var genre = $("table > tr:nth-child("+ counter + ") >td:nth-child(5)").text();
        var rating = $("table > tr:nth-child("+ counter +") >td:nth-child(6)").text();
        var gross_in_year_of_release =  $("table > tr:nth-child(" + counter + ") >td:nth-child(7)").text();
        var tickets_sold = $("table > tr:nth-child(" + counter + ") >td:nth-child(8)").text();
        var title_url = movie_title.replace(/\s+/g, '-').toLowerCase();
        var clean_title_url = title_url.replace(/\.|:|/g,'')
        var super_clean_url = clean_title_url.replace('&', 'and');
        if(super_clean_url.startsWith('the')) {
          var remove_the = super_clean_url.replace('the-','');
          final_url = remove_the.concat('-the')
        } else if(super_clean_url.startsWith('a-')) {
          var remove_a = super_clean_url.replace('a-','');
          final_url = remove_a.concat('-a')
        } else if(super_clean_url == "mad-love") {
          final_url = super_clean_url.concat('-('+ release_year + ')')
        } else {
          final_url = super_clean_url
        }

        if (release_year_int === calendar_year) {
          data.push({movie_title, release_date, release_year_int, distributor, genre, rating, gross_in_year_of_release, tickets_sold, final_url})
          }
        }
      }
      if (Movies.find().count() === 0) {
      for(var i=0;i<500;i++){

      Movies.insert({
        movie_title: data[i].movie_title,
        release_date: data[i].release_date,
        release_year: data[i].release_year_int,
        distributor: data[i].distributor,
        genre: data[i].genre,
        rating: data[i].rating,
        gross_in_year_of_release: data[i].gross_in_year_of_release,
        tickets_sold: data[i].tickets_sold,
        title_url: data[i].final_url
      })
    }
  }
    return data
  },


getIndividualMovieData: function () {
    var production = Movies.find({release_year: 1995}).fetch();
    for(var i=0;i<90;i++){
      var cheerio = Meteor.npmRequire('cheerio');
      var title = production[i].title_url

      ind_movie = Meteor.http.get("http://www.the-numbers.com/movie/" + title + "#tab=summary")
      $ = cheerio.load(ind_movie.content);
      var production_budget = $('#summary > p > table > tr:nth-child(1) > td:nth-child(2)').text();
      if (production_budget.startsWith('$')) {
        budget = production_budget
      } else {
        budget = "N/A"
      }
      
      var keyword_key = $('tr').find('td').filter(':contains("Keywords:")')
      var keyword_text = keyword_key.next().text()
      var keyword_array = keyword_text.split(', ')

      var running_time_key = $('tr').find('td').filter(':contains("Running Time:")')
      var running_time = running_time_key.next().text() 

      var franchise_key = $('tr').find('td').filter(':contains("Franchise:")')
      var franchise = franchise_key.next().text() 

      var source_key = $('tr').find('td').filter(':contains("Source:")')
      var source = source_key.next().text() 

      var production_method_key = $('tr').find('td').filter(':contains("Production&nbsp;Method:")')
      var production_method = production_method_key.next().text() 

      var creative_type_key = $('tr').find('td').filter(':contains("Creative&nbsp;Type:")')
      var creative_type = creative_type_key.next().text() 

      var production_company_key = $('tr').find('td').filter(':contains("Production Companies:")')
      var production_company_text = production_company_key.next().text()
      var production_company_array = production_company_text.split(', ')

      var production_countries_key = $('tr').find('td').filter(':contains("Production Countries:")')
      var production_countries_text = production_countries_key.next().text()
      var production_countries_array = production_countries_text.split(', ')


      console.log(production_countries_array)

    }
    return production_budget
}


});
        





