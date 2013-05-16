postsHandle = Meteor.subscribe('posts');

Meteor.autorun(function(){
	Meteor.subscribe('replies', Session.get('currentPostId'));
});