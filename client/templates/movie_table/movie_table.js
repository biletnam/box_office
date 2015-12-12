Template.movieTable.helpers({
	boxOffice: function() {
   		var boxOffice = this.domestic_box_office_total * .000001
        return boxOffice.toFixed()
	}
});