Meteor.methods({
	'setUserImageURL':function(userId, url){
		return Meteor.users.update(userId,{$set:{'profile.imageURLs.card': url}});
	},
	'changeName': function('newName'){
		if(Meteor.users.findOne({username:newName}))
			throw new Meteor.Error(409, 'Name already taken.');

		Meteor.users.update(Meteor.userId(),{$set:{username: newName}});

		//Usernames are denormalised on to posts so update these too.
		Posts.update({userId: Meteor.userId()}, {$set:{username: newName}});
	}
});