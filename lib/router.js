Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
	loadingTemplate: 'loading',
	name: 'monthlyAverageLine',
	template: "monthlyAverageLine",

});

