Template.homeTopKeywordsRow.helpers({
	boxOffice: function() {
   		var boxOffice = this.total_domestic_gross * .000001
        return boxOffice.toFixed()
	}
});