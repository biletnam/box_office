Template.areaChart.rendered = function() {  
    this.autorun(function () {
    	var movies = Movies.find().fetch()
        buildArea(movies)
    });

};
