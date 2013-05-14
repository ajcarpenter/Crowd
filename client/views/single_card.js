Template.singleCard.helpers({
	currentPost: function(){
		return Posts.findOne(Session.get('currentPostId'));
	}
});