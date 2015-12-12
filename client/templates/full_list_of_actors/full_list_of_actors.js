Template.fullListOfActors.rendered = function() { 

    this.autorun(function () {
      var route = Router.current().route.getName()
      if (route == 'alphaListOfActors') {
         var state = 'Alphabetical (A-Z)'
      } else {
         var state = 'Domestic Box Office (Highest First)'
      }
      
      Session.set('actorDropDown', state)
    });

};


Template.fullListOfActors.helpers({
	sort: function() {  
    	var sort = Session.get('actorDropDown')
    	return sort
  }
});


Template.fullListOfActors.events({
  'change #actor_sort_dropdown': function (e) {
    var route = $(event.target).val(); 
    Router.go(route)

  }
});
