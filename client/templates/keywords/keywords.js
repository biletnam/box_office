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
		return Keywords.find({}, {sort:{keyword_count: -1}}, {limit: 20})
	}

})