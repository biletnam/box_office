Template.keywords.rendered = function() {  
    this.autorun(function () {
      var route = Router.current().route.getName()
      if (route == 'topGrossing') {
         var state = 'Box Office Gross (Highest First)'
      } else if (route == 'mostMovies') {
         var state = 'Number of Movies (Most First)'
      } else {
        var state = 'Alphabetical (A-Z)'
      }
      
      Session.set('keywordDropDown', state)
    });

}


Template.keywords.helpers({
  sort: function() {  
    var sort = Session.get('keywordDropDown')
    return sort
  }
})


Template.keywords.events({
  'change #keyword_sort_dropdown': function (e) {
    var route = $(event.target).val();
    var drop_down_context = $("#keyword_sort_dropdown option:selected").text();
    Router.go(route)

  }
});



















