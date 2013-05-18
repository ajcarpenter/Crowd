Template.userLinkFlyout.helpers({
	'following':function(userId){
		return Follows.find({userId: userId}).count() > 0;
	}
});

Template.userLinkFlyout.events({
	'click .user-link-follow': function(e){
		e.stopPropagation();

		Meteor.call('follow',this.userId);
	},
	'click .user-link-unfollow': function(e){
		e.stopPropagation();

		Meteor.call('unfollow',this.userId);
	},
	'mouseleave .user-link-flyout': function(e){
		this._$userLinkFlyout.addClass('invisible');
	}
});


Template.userLinkFlyout.rendered = function(){
	this.data._$userLinkFlyout = $(this.find('.user-link-flyout'));
}