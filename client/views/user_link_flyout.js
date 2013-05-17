Template.userLinkFlyout.helpers({
	'following':function(userId){
		return Follows.find({userId: userId}).count() > 0;
	}
});

Template.userLinkFlyout.events({
	'click .user-link-follow': function(e){
		Meteor.call('follow',this.userId);
	},
	'click .user-link-unfollow': function(e){
		Meteor.call('unfollow',this.userId);
	}	
});