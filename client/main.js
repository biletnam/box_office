
  Meteor.call('getMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result[1].year);

    Session.set("dataTable", result[1].year);
  });
  
  Template.dataTable.helpers({
  rant: function () {
    return Session.get("dataTable")
  }
})




