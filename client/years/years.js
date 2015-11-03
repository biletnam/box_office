Template.years.rendered = function(){

		var data2 = Years.find().fetch();
		console.log(data2[0].top_grossing_movie_gross * .00001)
		var data = [data2[0].top_grossing_movie_gross * .000001, data2[1].top_grossing_movie_gross * .000001];
	   d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter().append("div")
      .style("width", function(d) { return (d) + "px"; })
      .text(function(d) { return d; });

}

// Template.years.helpers({
//   data: function () {
//     	return Years.find()
//   }
// })
