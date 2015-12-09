Template.homeTopFranchises.helpers({
	franchises: function() {
   		var franchises = Franchises.find()
        return franchises
	}
});