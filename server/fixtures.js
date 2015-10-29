
  Meteor.startup(function () {
   var cheerio = Meteor.npmRequire('cheerio');

   Meteor.methods({
      getMovieData: function () {
        result = Meteor.http.get("http://www.the-numbers.com/movies/#tab=year")
        $ = cheerio.load(result.content);
        var number = 9
        var year = $('#year > p > table > tr:nth-child('+ number +') > td:nth-child(1)').text()
        return year;
      }
   })
  });


