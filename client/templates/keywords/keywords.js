Template.keywords.rendered = function() {  

        // var keywords = Movies.find({keyword_array: {$in: ['Unexpected Families']}}).count()

      	var keywords = Keywords.find().fetch()
        console.log(keywords)
        var keyword_array = []

        keywords.forEach(function(keyword) {
        	keywords = Movies.find({keyword_array: {$in: [keyword.keyword]}}).count()
        	var dataPoint = {
            	keyword: keyword.keyword,
            	count: keywords
        	} 
        	if (keyword.keyword != "") {
        		keyword_array.push(dataPoint);
        	}
        })

        console.log(_.sortBy(keyword_array, 'count').reverse())
}