Template.actorRow.helpers({
	boxOffice: function() {
   		var boxOffice = this.total_domestic_box_office * .000001
        return boxOffice.toFixed()
	}
});