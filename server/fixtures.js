
  Meteor.startup(function () {
   var cheerio = Meteor.npmRequire('cheerio');

   Meteor.methods({
      getMovieData: function () {
        result = Meteor.http.get("http://www.the-numbers.com/movies/production-companies/")
        $ = cheerio.load(result.content);
        var resp = $('#page_filling_chart > center > table > tr > th:nth-child(1)')
        var respy = resp.text();
        return respy;
      }
   })
  });
