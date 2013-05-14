Meteor.Router.add({
	'/': 'cardGrid',

	'/posts/:_id': {
		to: 'singleCard', 
		and: function(id) { Session.set('currentPostId', id); }
	}
});
