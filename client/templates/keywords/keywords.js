Template.keywords.rendered = function() {  


       //  var keywords = Movies.find({keyword_array: {$in: ['Unexpected Families']}}).count()

      	// var keywords = Keywords.find().fetch()
       //  console.log(keywords)
       //  var keyword_array = []

       //  keywords.forEach(function(keyword) {
       //  	var keywords = Movies.find({keyword_array: {$in: [keyword.keyword]}}).count()
       //  	var movies = Movies.find({keyword_array: {$in: [keyword.keyword]}}).fetch()
       //  	var domestic_gross = _.pluck(movies, "domestic_box_office_total");
       //  	var total_domestic_gross = _.reduce(domestic_gross, function(sum, price){
       //  		return sum + parseFloat(price);
       //  	}, 0)
       //  	var dataPoint = {
       //      	keyword: keyword.keyword,
       //      	count: keywords
       //  	} 
       //  	if (keyword.keyword != "" ) {
       //  		keyword_array.push(dataPoint);
       //  		Keywords.update(keyword._id, 
       //  			{$set:{
       //  				keyword_count: keywords,
       //  				total_domestic_gross: total_domestic_gross
       //  				} 
       //  		})
       //  	}
       //  })

       //  var yes = _.sortBy(keyword_array, 'count').reverse()
       //  console.log(yes)

}


	// gross: function() {
	// 	var keyword = this.keyword
	// 	var gross_array = Movies.find({keyword_array: {$in: [keyword]}}).fetch()
	// 	var domestic_gross = _.pluck(gross_array, "domestic_box_office_total");
	// 	return _.reduce(domestic_gross, function(sum, price){
 //      		return sum + parseFloat(price);
 //    	}, 0);

	// }


Template.keywords.helpers({
	keywords: function() {
		return Keywords.find({}, {limit: 10})
	}

})

Template.keywords.rendered = function() {  
    // this.autorun(function () {  
    //    var keyword_cursor = Keywords.find({}, {limit: 10}).fetch()
    //    var array = []
    //    keyword_cursor.forEach(function(keyword) {
    //    var movies = Movies.find({keyword_array: {$in: [keyword.keyword]}}).fetch()
    //    var title = _.pluck(movies, "movie_title");
    //    var domestic_gross = _.pluck(movies, "domestic_box_office_total");
    //    var release_year = _.pluck(movies, "release_year");

    //    var dataPoint = {
    //           keyword: keyword.keyword,
    //           year_and_gross: {
    //           domestic_gross: domestic_gross,
    //           release_year: release_year
    //           }
    //    } 

    //     array.push(dataPoint)
    //    });
    //    console.log(array)

    //    });
    
 
}



















