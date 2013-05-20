Template.userLinkFlyout.helpers({
	'following':function(userId){
		return Follows.find({userId: userId}).count() > 0;
	}
});

Template.userLinkFlyout.events({
	'click .user-link-follow': function(e){
		e.stopPropagation();

		Meteor.call('follow',this._id);
	},
	'click .user-link-unfollow': function(e){
		e.stopPropagation();

		Meteor.call('unfollow',this._id);
	},
	'mouseleave .user-link-flyout': function(e,template){
		//TODO: Check template is being passed template instance
		template.find('.user-link-flyout').classList.add('invisible');
	}
});


Template.userLinkFlyout.rendered = function(){
	this._$userLinkFlyout = $(this.firstNode);
}