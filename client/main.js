postsHandle = Meteor.subscribe('posts');
myFollowsHandle = Meteor.subscribe('follows', Meteor.userId());

Meteor.autorun(function(){
	postRepliesHandle = Meteor.subscribe('replies', Session.get('currentPostId'));
	userFollowsHandle = Meteor.subscribe('follows', Session.get('currentUserId'));
});