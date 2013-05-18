Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('replies', function(postId){
	if(postId)
		return Posts.find({replyTo:postId});
});

/*Meteor.publish('following', function(userId){
	return Follows.find({followerId:userId});
});

Meteor.publish('followers', function(userId){
	return Follows.find({userId:userId});
});*/


Meteor.publish('follows', function(userId){
	return Follows.find({$or:[{userId: userId}, {followerId: userId}]});
});

/*Meteor.publish('follows', function(userId){
	Meteor.publishWithRelations({
		handle: this,
		collection: Follows,
		filter: {followerId: userId},
		mappings: [{
			key: 'userId',
			collection: Posts,
			filter: {userId: }
		}


		]


	});


	var sub = this, 
		followHandle = null, 
		postHandles = [];

	var publishFollowPosts = function(follow){
		var posts = Posts.find({userId: follow.userId});
		postHandles[follow._id] = posts.observe({
			added: function(id, post){
				sub.added('posts', id, post);
			}
		});

		followHandle = Follows.find({$or:[{userId: userId}, {followerId: userId}]}).observe({
			added: function(id, follow) {
				publishFollowPosts(follow);
				sub.added('follows', id, follow);
			},
			removed: function(id) {
				postHandles[id] && postHandles[id].stop();
				sub.removed('follows', id, _.keys(oldFollow));
			}

		});

		sub.ready();

		sub.onStop(function() {
			followHandle.stop();
			postHandles.stop();
		});

	}
});*/