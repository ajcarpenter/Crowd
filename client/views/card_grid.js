Template.timeline.helpers({
	options: function() {
		return {
			template:'postCard',
			showCompose: !!Meteor.userId(),
			paginationHandle: timelineHandle,
			collection: function(){
				var following = Follows.find({followerId: Meteor.userId()}).map(function(follow){return follow.userId;});
				return Posts.find({replyTo: null, $or:[{userId: {$in: following}}, {userId: Meteor.userId()}]},{sort:{timestamp:-1}, limit: timelineHandle.limit()});
			}
		};
	}
});

Template.followers.helpers({
	options: function() {
		return {
			template:'userCard',
			showCompose: false,
			collection: function(){
				var followers = Follows.find({userId: Meteor.userId()}).map(function(follow){return follow.followerId});
				return Meteor.users.find({_id: {$in: followers}});
			}
		};
	}
});

Template.following.helpers({
	options: function() {
		return {
			template:'userCard',
			showCompose: false,
			collection: function(){
				var followers = Follows.find({followerId: Meteor.userId()}).map(function(follow){return follow.userId});
				return Meteor.users.find({_id: {$in: followers}});
			}
		};
	}
});

Template.userPosts.helpers({
	options: function() {
		return {
			template:'postCard',
			showUserCard:true,
			showCompose: Session.get('currentUserId') === Meteor.userId(),
			collection: function(){
				return Posts.find({userId: Session.get('currentUserId'), replyTo:null},{sort:{timestamp:-1}});
			}
		};
	}
});

Template.userSearch.helpers({
	options: function() {
		return {
			template:'userCard',
			showCompose: false,
			collection: function(){
				return Meteor.users.find({username: {$regex : Session.get('searchQuery')}});
			}
		};
	}
});

Template.cardGrid.helpers({
	usesTemplate: function(template){
		return this.template === template;
	},
	showLoadMore: function(){
		return !!this.paginationHandle;
	},
	cells:function(){
		return this.collection();
	},
	thisUser:function(){
		return Meteor.users.findOne(Session.get('currentUserId'));
	},
	showUserCard:function(){
		return this.showUserCard && Session.get('currentUserId') != Meteor.userId();
	}
});