Meteor.Router.add({
	'/': 'timeline',
	'/followers': 'followers',
	'/following': 'following',
	'/user/:id/posts': {
		to: 'userPosts',
		and: function(id) { Session.set('currentUserId', id); }
	},
	'/posts/:_id': {
		to: 'singleCard', 
		and: function(id) { Session.set('currentPostId', id); }
	},
	'/usersearch': 'userSearch'
});
