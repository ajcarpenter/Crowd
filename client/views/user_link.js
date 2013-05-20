Template.userLink.events({
	'mouseenter .user-link': function(e,template){
		//TODO: Figure out if i can get flyout template instance here
		if(this._id != Meteor.userId()){
			template.find('.user-link-flyout').classList.remove('invisible');
		}
	}
})

Template.userLink.helpers({
	'isCurrentUser': function(userId){
		return this._id === Meteor.userId();
	}
})