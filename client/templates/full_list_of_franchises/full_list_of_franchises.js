Template.fullListOfFranchises.helpers({
	franchises: function() {
   		var franchisesData = Franchises.find({franchise_title: {$not: ""}}, {sort: {franchise_title: 1}})
        return franchisesData
	}
});



