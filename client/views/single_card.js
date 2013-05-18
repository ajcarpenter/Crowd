Template.singleCard.helpers({
	currentPost: function(){
		return Posts.findOne(Session.get('currentPostId'));
	}
});

Template.singleCard.rendered = function(){
	Meteor.call('seen', this._id);
};