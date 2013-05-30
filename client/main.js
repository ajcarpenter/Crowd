myFollowsHandle = Meteor.subscribe('follows', Meteor.userId());

timelineHandle = Meteor.subscribeWithPagination('timeline',10);

Meteor.autorun(function(){
	var currentPostId = Session.get('currentPostId');
	postRepliesHandle = Meteor.subscribe('replies', currentPostId);
	currentPostHandle = Meteor.subscribe('currentPost', currentPostId);
});

Meteor.autorun(function(){
	var currentUserId = Session.get('currentUserId');
	userFollowsHandle = Meteor.subscribe('follows', currentUserId);
	userPostsHandle = Meteor.subscribe('userPosts', currentUserId);
});

Meteor.autorun(function(){
	userSearchHandle = Meteor.subscribe('userSearch', Session.get('searchQuery'));
});