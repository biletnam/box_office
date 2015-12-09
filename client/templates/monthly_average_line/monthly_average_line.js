Template.monthlyAverageLine.rendered = function() {  
    this.autorun(function () {  
        var movies = Movies.find().fetch()
        
        buildMonthlyAverageLine(movies)
    });

}