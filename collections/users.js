Meteor.methods({
	'setUserImageURL':function(userId, url){
		return Meteor.users.update(userId,{$set:{'profile.imageURLs.card': url}});
	}
});