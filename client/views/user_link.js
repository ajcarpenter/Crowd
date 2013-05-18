Template.userLink.events({
	'mouseenter .user-link': function(e){
		if(this.userId != Meteor.userId())
			this._$userLinkFlyout.removeClass('invisible');
	}
})

Template.userLink.helpers({
	'isCurrentUser': function(userId){
		return userId === Meteor.userId();
	}
})