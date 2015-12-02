Template.fullListOfFranchises.helpers({
	franchises: function() {
   		var franchisesData = Franchises.find({}, {sort: {franchise_title: 1}})
        return franchisesData
	}
});



