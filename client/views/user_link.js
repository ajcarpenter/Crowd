Template.userLink.events({
	'mouseenter .user-link': function(e,template){
		if(this._id != Meteor.userId()){
			template.find('.user-link-flyout').classList.remove('invisible');
		}
	}
})

Template.userLink.helpers({
	'isCurrentUser': function(){
		return this._id === Meteor.userId();
	}
})