Meteor.methods({
  // getMovieData: function () {
  //   var cheerio = Meteor.npmRequire('cheerio');
  //   result = Meteor.http.get("http://www.the-numbers.com/movies/#tab=year")
  //   $ = cheerio.load(result.content);
    
  //   var year_increment 
  //   var movie_data = []

  //   for (year_increment=8; year_increment<43; year_increment++) {
  //     var year = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(1)').text();
  //     var top_grossing_movie_title = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(3)').text();
  //     var top_grossing_movie_genre = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(4)').text();
  //     var top_grossing_movie_production_budget = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(5)').text();
  //     var top_grossing_movie_production_budget_clean = Number(top_grossing_movie_production_budget.replace(/[^0-9\.]+/g,""));
  //     var top_grossing_movie_gross = $('#year > p > table > tr:nth-child('+ year_increment +') > td:nth-child(6)').text();
  //     var top_grossing_movie_gross_clean = Number(top_grossing_movie_gross.replace(/[^0-9\.]+/g,""));
  //     movie_data.push({year, top_grossing_movie_title, top_grossing_movie_genre, top_grossing_movie_production_budget_clean, top_grossing_movie_gross_clean})
  //   }
    
  //   if (Years.find().count() === 0) {
  //     for(var i=0;i<30;i++){

  //     Years.insert({
  //       year: movie_data[i].year,
  //       top_grossing_movie_title: movie_data[i].top_grossing_movie_title,
  //       top_grossing_movie_genre: movie_data[i].top_grossing_movie_title,
  //       top_grossing_movie_production_budget: movie_data[i].top_grossing_movie_production_budget_clean,
  //       top_grossing_movie_gross: movie_data[i].top_grossing_movie_gross_clean
  //     })
  //   }
  // }
  //   return movie_data
  // },

 seedAnnualTopGrossing: function () {
  var cheerio = Meteor.npmRequire('cheerio');
  
  var year
  var counter
  var data = []
        
  for (year=2001; year<2002; year++) {
    var result = Meteor.http.get("http://www.the-numbers.com/market/" + year + "/top-grossing-movies")
    $ = cheerio.load(result.content);
      for (counter=2; counter<102; counter++) {
        var movie_title = $("table > tr:nth-child(" + counter + ") >td:nth-child(2)").text();
        console.log(movie_title)
        var release_date = $("table > tr:nth-child(" + counter + ") >td:nth-child(3)").text();
        var release_array = release_date.split("/")
        var release_month = parseInt(release_array[0])
        var release_day = parseInt(release_array[1])
        var release_year = release_date.slice(-4);
        var release_year_int = parseInt(release_year)
        var calendar_year = year
        var distributor = $("table > tr:nth-child(" + counter + ") >td:nth-child(4)").text();
        var genre = $("table > tr:nth-child("+ counter + ") >td:nth-child(5)").text();
        var rating = $("table > tr:nth-child("+ counter +") >td:nth-child(6)").text();
        var gross_in_year_of_release_string =  $("table > tr:nth-child(" + counter + ") >td:nth-child(7)").text();
        var gross_in_year_of_release = parseInt(gross_in_year_of_release_string.replace(/\$/g, '').replace(/,/g, ''));
        var tickets_sold_string = $("table > tr:nth-child(" + counter + ") >td:nth-child(8)").text();
        var tickets_sold = parseInt(tickets_sold_string.replace(/,/g, ''))
        var title_url = movie_title.replace(/\s+/g, '-').toLowerCase();
        var clean_title_url = title_url.replace(/\.|:|�/g,'')
        var super_clean_url = clean_title_url.replace('&', 'and');

        if(movie_title == "Titanic in 3D") {
          var movie_title = "Titanic"
          var release_year_int = 1997
          var super_clean_url = "titanic"
        }

        if(movie_title == "The Lost World: Jurassic Park") {
          var super_clean_url = "lost-world-jurassic-park"
        }

        if(movie_title == "Face/Off") {
          var super_clean_url = "face-off"
        }

        if(movie_title == "Grosse Pointe Blank") {
          var super_clean_url = "grosse-point-blank"
        }

        if(movie_title == "An American Werewolf in Paris") {
          var super_clean_url = "american-werewolf-in-paris-an"
        }

        if(movie_title == "The Mask of Zorro") {
          var super_clean_url = "mask-of-zorro"
        }

        if(movie_title == "The Prince of Egypt") {
          var super_clean_url = "prince-of-egypt"
        }

        if(movie_title == "The Man in the Iron Mask") {
          var super_clean_url = "man-in-the-iron-mask"
        }

        if(movie_title == "The Object of my Affection") {
          var super_clean_url = "object-of-my-affection"
        }

        if(movie_title == "The Replacement Killers") {
          var super_clean_url = "replacement-killers"
        }

        if(movie_title == "The Odd Couple II") {
          var super_clean_url = "Odd-Couple-II"
        }

        if(movie_title == "Mystery Men") {
          var super_clean_url = "mystery-men-the"
        }

        if(movie_title == "An Ideal Husband") {
          var super_clean_url = "ideal-husband-an"
        }

        if(movie_title == "The Flintstones in Viva Rock Vegas") {
          var super_clean_url = "Flintstones-in-Viva-Rock-Vegas"
        }
        
        if(movie_title == "Titan A.E.") {
          var super_clean_url = "titan-a-e"
        }

        if(movie_title == "Harry Potter and the Sorcerer�s Stone") {
          var super_clean_url = "Harry-Potter-and-the-Sorcerers-Stone"
        }

        if(movie_title == "The Master of Disguise") {
          var super_clean_url = "master-of-disguise"
        }

        if(movie_title == "Fahrenheit 9/11") {
          var super_clean_url = "Fahrenheit-9-11"
        }

        if(movie_title == "The Forgotton") {
          var super_clean_url = "Forgotten-The"
        }

        if(movie_title == "The War of the Worlds") {
          var super_clean_url = "War-of-the-Worlds"
        }

        if(movie_title == "March of the Penguins") {
          var super_clean_url = "Marche-de-l-empereur-La"
        }

        if(movie_title == "The Legend of Zorro") {
          var super_clean_url = "Legend-of-Zorro"
        }

        if(movie_title == "R.V.") {
          var super_clean_url = "r-v"
        }

        if(movie_title == "D�j� Vu") {
          var super_clean_url = "Deja-Vu-(2006)"
        }

        if(movie_title == "Transformers") {
          var super_clean_url = "transformers-the"
        }

        if(movie_title == "TMNT") {
          var super_clean_url = "Teenage-Mutant-Ninja-Turtles-(2007)"
        }
        
        if(movie_title == "P.S., I Love You") {
          var super_clean_url = "P-S-I-Love-You"
        }
        
        if(movie_title == "10,000 B.C.") {
          var super_clean_url = "10-000-B-C"
        }

        if(movie_title == "Hannah Montana/Miley Cyrus: Best of Both Worlds Concert Tour") {
          var super_clean_url = "Hannah-Montana-Miley-Cyrus-Best-of-Both-Worlds-Concert-Tour"
        }
        
        
        
        if(super_clean_url.startsWith('the')) {
          var remove_the = super_clean_url.replace('the-','');
          var final_url = remove_the.concat('-the')
        } else if(super_clean_url.startsWith('a-')) {
          var remove_a = super_clean_url.replace('a-','');
          var final_url = remove_a.concat('-a') 
        } else if(super_clean_url == "mad-love" || super_clean_url == "out-of-sight" || super_clean_url == "wild-things" || super_clean_url == "great-expectations" || super_clean_url == "planet-of-the-apes" || super_clean_url == "bad-company" || super_clean_url == "underworld" || super_clean_url == "miracle" || super_clean_url == "heartbreak-kid-the" || super_clean_url == "changeling"  ) {
          var final_url = super_clean_url.concat('-('+ release_year + ')')
        } else if(super_clean_url == "escape-from-la") {
          var final_url = "escape-from-l-a"
        } else if(super_clean_url == "la-confidential") {
          var final_url = "l-a-confidential"
        } else if(super_clean_url == "gijane") {
          var final_url = "g-i-jane"
        } else if(super_clean_url == "us-marshals") {
          var final_url = "u-s-marshals"
        } else {
          var final_url = super_clean_url
        }

        if (release_year_int === calendar_year) {
          data.push({movie_title, release_date, release_day, release_month, release_year_int, distributor, genre, rating, gross_in_year_of_release, tickets_sold, final_url})
          }
        }
      }
      if (Movies.find({release_year: 2001}).count() === 0) {
      for(var i=0;i<800;i++){

      Movies.insert({
        movie_title: data[i].movie_title,
        release_date: data[i].release_date,
        release_day: data[i].release_day,
        release_month: data[i].release_month,
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
    var movie = Movies.find({release_year: 2008}).fetch();
    for(var i=0;i<100;i++){
      var cheerio = Meteor.npmRequire('cheerio');
      var title = movie[i].title_url

      ind_movie = Meteor.http.get("http://www.the-numbers.com/movie/" + title + "#tab=summary")
      $ = cheerio.load(ind_movie.content);

      var domestic_box_office_total_key = $('tr').find('td').filter(':contains("Domestic Box Office")')
      var domestic_box_office_total_string = domestic_box_office_total_key.next().text()
      var domestic_box_office_total = parseInt(domestic_box_office_total_string.replace(/\$/g, '').replace(/,/g, '')); 

      var international_box_office_total_key = $('tr').find('td').filter(':contains("International Box Office")')
      var international_box_office_total_string = international_box_office_total_key.next().text()
      var international_box_office_total = parseInt(international_box_office_total_string.replace(/\$/g, '').replace(/,/g, ''));

      var worldwide_box_office_total_key = $('tr').find('td').filter(':contains("Worldwide Box Office")')
      var worldwide_box_office_total_string = worldwide_box_office_total_key.next().text()
      var worldwide_box_office_total = parseInt(worldwide_box_office_total_string.replace(/\$/g, '').replace(/,/g, ''));  


      var production_budget_key = $('tr').find('td').filter(':contains("Production&nbsp;Budget:")')
      var production_budget_string = production_budget_key.next().text()
      var production_budget = parseInt(production_budget_string.replace(/\$/g, '').replace(/,/g, ''));    
      
      var keyword_key = $('tr').find('td').filter(':contains("Keywords:")')
      var keyword_text = keyword_key.next().text()
      var keyword_array = keyword_text.split(', ')

      var running_time_key = $('tr').find('td').filter(':contains("Running Time:")')
      var running_time = parseInt(running_time_key.next().text()) 

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

      var cast_array = []

      var cast_count = $('#cast:nth-child(1) > table').children().length

      for(var counter=1; counter<cast_count; counter++){
        var cast = $('#cast:nth-child(1) > table > tr:nth-child(' + counter + ') > td:nth-child(1)').text()
        cast_array.push(cast)

      }

      var crew_array = []

      var crew_count = $('#cast:nth-child(2) > table').children().length


      for(var crew_counter=1; crew_counter<crew_count; crew_counter++){
        var position = $('#cast:nth-child(2) > table > tr:nth-child(' + crew_counter + ') > td:nth-child(1)').text()
        var crew_person = $('#cast:nth-child(2) > table > tr:nth-child(' + crew_counter + ') > td:nth-child(3)').text()

        crew_array.push({position, crew_person})

      }

      console.log(title)
      console.log(production_budget)

      console.log(movie[i]._id)

      Movies.update(movie[i]._id, {
        $set: {
          domestic_box_office_total: domestic_box_office_total,
          international_box_office_total: international_box_office_total,
          worldwide_box_office_total: worldwide_box_office_total,
          production_budget: production_budget,
          keyword_array: keyword_array,
          running_time: running_time,
          franchise: franchise,
          source: source,
          production_method: production_method,
          creative_type: creative_type,
          production_company_array: production_company_array,
          production_countries_array: production_countries_array,
          cast_array: cast_array,
          crew_array: crew_array

        }

      })

    }

}


});
        





