
Template.fullListOfFranchises.rendered = function() { 

    this.autorun(function () {
      var route = Router.current().route.getName()
      if (route == 'fullListOfFranchises') {
         var state = 'Total Box Office Gross (Highest First)'
      } else if (route == 'countFullListOfFranchises') {
         var state = 'Number of Movies (Most First)'
      } else {
        var state = 'Alphabetical (A-Z)'
      }
      
      Session.set('franchiseDropDown', state)
    });

};

Template.fullListOfFranchises.helpers({
	sort: function() {  
    	var sort = Session.get('franchiseDropDown')
    	return sort
  }
});


Template.fullListOfFranchises.events({
  'change #franchise_sort_dropdown': function (e) {
    var route = $(event.target).val(); 
    Router.go(route)

  }
});
