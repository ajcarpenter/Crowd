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

		Follows.insert({
			userId: userId,
			followerId: user._id
		});
	},
	unfollow:function(userId){
		var user = Meteor.user();
	
		//TODO: Validation here

		Follows.remove({
			userId: userId,
			followerId: user._id		
		});
	},
	addTag:function(userId, tag){
		var user = Meteor.user();

		Follows.find({userId: userId, followerId: user._id},{$addToSet:{tags: tag}});
	}
})