/*
Set up array and dependency for tracking following list
This allows us to republish timeline posts.
*/
var _following = [];
var _followingListener = new Deps.Dependency();

following = function(){
	_followingListener.depend();
	return _following;
}


//Start publications

Meteor.publish('userPosts', function(userId) {
	return Posts.find({userId: userId, replyTo: null});
});

Meteor.publish('currentPost', function(postId){
	//Make sure a post is returned if a user navigates 
	//to a post not in their timeline or on a user profile.
	return Posts.find(postId);
});

Meteor.publish('replies', function(postId){
	if(postId)
		return Posts.find({replyTo:postId});
});

Meteor.publish('userSearch', function(searchQuery){
	return Meteor.users.find({username: {$regex: searchQuery}});
});

Meteor.publish('follows', function(userId){
	var self = this;
	var userHandles = [];

	var publishUser = function(userId){
		if(!userHandles[userId]){
			var userHandle = Meteor.users.find({_id: userId}, {fields: {'username': 1, 'profile': 1}});

			userHandles[userId] = userHandle.observe({
				added: function(user){
					self.added('users', user._id, user);
				},
				removed: function(user){
					self.removed('users', user._id);
				}
			});
		}
	}

	var followingHandle = Follows.find({followerId: userId}).observe({
		added: function(follow){
			_following.push(follow.userId);
			_followingListener.changed();

			publishUser(follow.userId);
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			_following = _.without(_following, follow.userId);
			_followingListener.changed();

			userHandles[follow.userId] && userHandles[follow.userId].stop();
			self.removed('follows'. follow._id);
		}
	});

	var followerHandle = Follows.find({userId: userId}).observe({
		added: function(follow){
			publishUser(follow.followerId);
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			userHandles[follow.followerId] && userHandles[follow.followerId].stop();
			self.removed('follows'. follow._id);
		}
	});
	

	self.ready();

	self.onStop(function(){
		followingHandle.stop();
		followerHandle.stop();

		for(var id in userHandles){
			userHandles[id].stop();
		}
	});
});

Meteor.publish('timeline', function(limit){
	return Posts.find({userId: {$in: following()}, replyTo:null},{sort:{timestamp:-1}, limit:limit});
});
