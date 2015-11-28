function buildMinMaxKeyword() {
        var min_max_data = Session.get('minMaxData')
        var min_max_categories = Session.get('minMaxCategories')
        var keyword_title = Session.get('keywordTitle')

        $('#container-min-max').highcharts({

        chart: {
            type: 'columnrange',
            inverted: 'true'
        },

        title: {
            text: keyword_title + ' Movie Gross Variation by Year'
        },

        subtitle: {
        },

        xAxis: {
            categories: min_max_categories
        },

        yAxis: {
            title: {
                text: 'Total Domestic Gross'
            },
            min: 0
        },

        tooltip: {
            valueDecimals: 2
        },
     

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        return this.y;
                    }
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Range',
            data: min_max_data
        }]

    });
}


Template.keywordPage.helpers({
    movies: function() {

        var movies_data = Movies.find({keyword_ids: {$in: [this._id]}})
        return movies_data
	}
})

Template.keywordPage.rendered = function() {  
    this.autorun(function () {  
    	var controller = Iron.controller();
    	var keyword_state = controller.state.get('keywordId');
		var keyword_title = Keywords.findOne(keyword_state)
		var movies_data = Movies.find({keyword_array: {$in: [keyword_title.keyword]}}).fetch()

		testData = []
		movies_data.forEach(function(movie) {
  
   
		var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var inflation_rate = inflation_year.inflation_rate 
   
        
        var dataPoint = {
            release_year: movie.release_year,
            domestic_box_office_total: movie.domestic_box_office_total * inflation_rate,
            movie_title: movie.movie_title


        };
        testData.push(dataPoint);
    });
    var years = _.pluck(testData, 'release_year');

    var categories = _.uniq(years)
    var sqld_data = alasql('SELECT release_year, MIN(domestic_box_office_total) as min_bo, MAX(domestic_box_office_total) as max_bo FROM ? GROUP BY release_year ORDER BY release_year ASC', [testData]); 
    var final_years = _.sortBy(categories, function(num) {
        return num
    })

    var final_data = _.map(sqld_data, _.values)

    buildMinMaxKeyword()

    Session.set('minMaxData', final_data)
    Session.set('minMaxCategories', final_years)
    Session.set('keywordTitle', keyword_title.keyword)

    });
    
 
}