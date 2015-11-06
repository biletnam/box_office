Template.movies.helpers({
  posts: function(){
  	poo = Movies.find().fetch()[100].movie_title;
  	return poo
  }
});