myFollowsHandle = Meteor.subscribe('follows', Meteor.userId());

timelineHandle = Meteor.subscribeWithPagination('timeline',10);

Meteor.autorun(function(){
	postRepliesHandle = Meteor.subscribe('replies', Session.get('currentPostId'));
	currentPostHandle = Meteor.subscribe('currentPost', Session.get('currentPostId'));

	userFollowsHandle = Meteor.subscribe('follows', Session.get('currentUserId'));
	userPostsHandle = Meteor.subscribe('userPosts', Session.get('currentUserId'));
});