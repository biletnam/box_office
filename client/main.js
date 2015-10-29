
  Meteor.call('getMovieData', function(error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result);

    Session.set("dataTable", result);
  });
  
  Template.dataTable.helpers({
  rant: function () {
    return Session.get("dataTable")
  }
})




