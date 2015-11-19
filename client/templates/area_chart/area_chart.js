function buildArea() {
	var area_chart_cursor = Session.get('areaChartData')
	var area_chart_context = Session.get('areaChartContext')
	var area_chart_data = []

	area_chart_cursor.forEach(function(movie) {
        var movie_release_year = movie.release_year
        var inflation_year = Years.findOne({year_int: movie_release_year})
        var inflation_rate = inflation_year.inflation_rate
   

        
        var dataPoint = {
            release_year: movie.release_year,
            domestic_box_office_total: movie.domestic_box_office_total * inflation_rate,
            rating: movie.rating,
            genre: movie.genre,
            production_method: movie.production_method


        };
        area_chart_data.push(dataPoint);
    });
    
 
	
	if (area_chart_context == "rating") {
    	var sqld_data = alasql('SELECT release_year, rating, SUM(domestic_box_office_total) AS box_office_total FROM ? GROUP BY release_year, rating ORDER BY release_year, rating', [area_chart_data]); 
    } else if (area_chart_context == "genre") {
    	var sqld_data = alasql('SELECT release_year, genre, SUM(domestic_box_office_total) AS box_office_total FROM ? GROUP BY release_year, genre ORDER BY release_year, genre', [area_chart_data]); 
    }






      var prepped_data =  _.chain(sqld_data)
        .groupBy(area_chart_context)
        .map(function(value, key) {
        return {
            name: key,
            data: _.pluck(value, 'box_office_total'),
            year: _.pluck(value, 'release_year')
        }
        })
        .value();
        

        console.log(sqld_data)
    $('#container-area').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Historic and Estimated Worldwide Population Distribution by Region'
        },
        subtitle: {
            text: 'Source: Wikipedia.org'
        },
        xAxis: {
            categories: ['1995', 
            '1996', 
            '1997', 
            '1998', 
            '1999', 
            '2000', 
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014'
           	 ],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Percent'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
        series: prepped_data
    });
}

Template.areaChart.rendered = function() {  
    var keywords = Keywords.find().fetch()
    console.log(keywords)
    this.autorun(function () {
    	context = "rating"
    	var movies = Movies.find().fetch()
    	Session.set('areaChartData', movies)
    	Session.set('areaChartContext', context)
        buildArea()
    });

}