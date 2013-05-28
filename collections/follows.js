/*
Follow
{
	_id,
	userId,
	followerId,
	tags:[]
}
*/
Follows = new Meteor.Collection('follows');

Meteor.methods({
	follow:function(userId){
		var user = Meteor.user();

		//TODO: Validation here
		Meteor.users.update(userId,{$inc:{'profile.followerCount':1}});
		Meteor.users.update(user._id,{$inc:{'profile.followingCount':1}});

		Follows.insert({
			userId: userId,
			followerId: user._id,
			tags: [{tag:'Following',userDeletable:false}]
		});
	},
	unfollow:function(userId){
		var user = Meteor.user();

		Meteor.users.update(userId,{$inc:{'profile.followerCount':-1}});
		Meteor.users.update(user._id,{$inc:{'profile.followingCount':-1}});
	
		//TODO: Validation here

		Follows.remove({
			userId: userId,
			followerId: user._id		
		});
	},
	addTag:function(userId, tag){
		var user = Meteor.user();

		Follows.find({userId: userId, followerId: user._id},{$addToSet:{tags: {tag: tag, userDeletable: true}}});
	}
})