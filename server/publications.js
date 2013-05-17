Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('replies', function(postId){
	return Posts.find({replyTo:postId});
});

/*Meteor.publish('following', function(userId){
	return Follows.find({followerId:userId});
});

Meteor.publish('followers', function(userId){
	return Follows.find({userId:userId});
});*/

Meteor.publish('follows', function(userId){
	return Follows.find({
		$or:[
			{userId: userId}, 
			{followerId: userId}
		]
	});
});