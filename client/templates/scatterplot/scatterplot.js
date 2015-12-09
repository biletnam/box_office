

Template.scatterplot.rendered = function() {  
  Session.set('selectedYearScatter', 1995)
  Session.set('selectedYearScatter2', 1996)
    this.autorun(function () { 
        var year = parseInt(Session.get('selectedYearScatter'))
        var year2 = parseInt(Session.get('selectedYearScatter2'))
        var movies = Movies.find({release_year: year}).fetch()
        var movies2 = Movies.find({release_year: year2}).fetch()
        Session.set('scatterPlotData', movies)
        Session.set('scatterPlotData2', movies2) 
        buildScatter()
    });

}

Template.scatterplot.events({
    "change #year_select_scatter": function(e) {
        var year = $("#year_select_scatter option:selected").text();
        Session.set('selectedYearScatter', year)
    },
    "change #year_select_scatter2": function(e) {
        var year2 = $("#year_select_scatter2 option:selected").text();
        Session.set('selectedYearScatter2', year2)
    }
})

