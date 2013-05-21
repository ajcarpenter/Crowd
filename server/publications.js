Meteor.publish('userPosts', function(userId) {
	return Posts.find({userId: userId, replyTo: null});
});

Meteor.publish('currentPost', function(postId){
	//This is to make sure a post is returned if a user navigates 
	//to a post not in their timeline or on a user profile.
	return Posts.find(postId);
});

Meteor.publish('replies', function(postId){
	if(postId)
		return Posts.find({replyTo:postId});
});

Meteor.publish('follows', function(userId){
	var self = this;
	var userHandles = [];

	var followHandle = Follows.find({$or:[{userId: userId}, {followerId: userId}]}).observe({
		added: function(follow){
			var otherUserId = follow.userId === userId ? follow.followerId : follow.userId;
			if(!userHandles[otherUserId]){
				var userHandle = Meteor.users.find({_id: otherUserId}, {fields: {'username': 1, 'profile': 1}});

				userHandles[otherUserId] = userHandle.observe({
					added: function(user){
						self.added('users', user._id, user);
					},
					removed: function(user){
						self.removed('users', user._id);
					}
				});
			}
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			var otherUserId = follow.userId === userId ? follow.followerId : follow.userId;
			userHandles[otherUserId] && userHandles[otherUserId].stop();
			self.removed('follows'. follow._id);
		}
	});

	self.ready();

	self.onStop(function(){
		followHandle.stop();

		for(var id in userHandles){
			userHandles[id].stop();
		}
	});
});

Meteor.publish('timeline', function(limit){
	var self = this;
	var postHandles = [];

	var followingHandle = Follows.find({followerId: self.userId}).observe({
		added: function(follow){
			var postHandle = Posts.find({userId: follow.userId, replyTo:null},{sort:{timestamp:-1}, limit:limit});
			postHandles[follow.userId] = postHandle.observe({
				added: function(post){
					self.added('posts', post._id, post);
				},
				removed: function(post){
					self.removed('posts', post._id);
				}
			});
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			var postHandle = postHandles[follow.userId];
			if(postHandle){
				postHandle.stop();
			}
			self.removed('follows', follow._id);
		}
	});

	self.ready();

	self.onStop(function(){
		followingHandle.stop();

		for(var id in postHandles){
			postHandles[id].stop();
		}
	});
});


Meteor.publish('timelineV2', function(limit){
	var self = this;
	var postsHandle;

	var following = Follows.find({followerId: self.userId})
		.map(function(follow){
			return follow.userId;
		});

	var followingHandle = Follows.find({followerId: self.userId}).observe({
		added: function(follow){
			following.push(follow.userId);
			postsHandle = Posts.find({userId: {$in: following}, replyTo:null},{sort:{timestamp:-1}, limit:limit});
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			following = _.without(following, follow.userId);
			postsHandle = Posts.find({userId: {$in: following}, replyTo:null},{sort:{timestamp:-1}, limit:limit});
			self.removed('follows', follow._id);
		}
	});

	self.ready();

	self.onStop(function(){
		followingHandle.stop();
	});
});
