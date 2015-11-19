Template.keywordRow.helpers({
	// gross: function() {
	// 	var keyword = this.keyword
	// 	var gross_array = Movies.find({keyword_array: {$in: [keyword]}}).fetch()
	// 	var domestic_gross = _.pluck(gross_array, "domestic_box_office_total");
	// 	return _.reduce(domestic_gross, function(sum, price){
 //      		return sum + parseFloat(price);
 //    	}, 0);

	// }

})


      // var keywords = Movies.find({keyword_array: {$in: ['Unexpected Families']}}).count()

      	// var keywords = Keywords.find().fetch()
       //  console.log(keywords)
       //  var keyword_array = []

       //  keywords.forEach(function(keyword) {
       //  	keywords = Movies.find({keyword_array: {$in: [keyword.keyword]}}).count()
       //  	var dataPoint = {
       //      	keyword: keyword.keyword,
       //      	count: keywords
       //  	} 
       //  	if (keyword.keyword != "" ) {
       //  		keyword_array.push(dataPoint);
       //  		Keywords.update(keyword._id, 
       //  			{$set:{keyword_count: keywords} 
       //  		})
       //  	}
       //  })

       //  var yes = _.sortBy(keyword_array, 'count').reverse()
       //  console.log(yes)