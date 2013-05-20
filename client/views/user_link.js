Template.userLink.events({
	'mouseenter .user-link': function(e){
		//TODO: Figure out if i can get flyout template instance here
		if(this.userId != Meteor.userId())
			this._$userLinkFlyout.removeClass('invisible');
	}
})

Template.userLink.helpers({
	'isCurrentUser': function(userId){
		return userId === Meteor.userId();
	}
})