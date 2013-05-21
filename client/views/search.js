Template.search.events({
	'keydown .search-input': function(e){
		if(e.which === 13){
			$target = $(e.target);

			var searchQuery = $target.val();

			Session.set('searchQuery', '.*' + searchQuery + '.*');
			Meteor.Router.to('/usersearch');
		}
	}
});