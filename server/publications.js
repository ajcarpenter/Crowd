/*
Anything coupled to a userCard grid should also publish the user doc
so we can ensure that we have username/image refs. For post cards, we assume
userId is denormalised on to the post so don't need user doc. Subject to change.
*/

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

var defaultUserFields = {fields: {'username': 1, 'profile': 1}};

var publishUser = function(userId, userHandles, pub){
	var userHandle = Meteor.users.find({_id: userId}, defaultUserFields);

	if(pub && !userHandles[userId]){
		userHandles[userId] = userHandle.observe({
			added: function(user){
				pub.added('users', user._id, user);
			},
			removed: function(user){
				pub.removed('users', user._id);
			}
		});
	} else 
		return userHandle;
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
	if(searchQuery && searchQuery.length > 0)
		return Meteor.users.find({username: {$regex: searchQuery}}, _.extend(defaultUserFields,{limit:20}));
});

Meteor.publish('follows', function(userId){
	var self = this;
	var userHandles = [];

	var followingHandle = Follows.find({followerId: userId}).observe({
		added: function(follow){
			_following.push(follow.userId);
			_followingListener.changed();

			publishUser(follow.userId, userHandles, self);
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			_following = _.without(_following, follow.userId);
			_followingListener.changed();

			userHandles[follow.userId] && userHandles[follow.userId].stop();
			self.removed('follows', follow._id);
		}
	});

	var followerHandle = Follows.find({userId: userId}).observe({
		added: function(follow){
			publishUser(follow.followerId, userHandles, self);
			self.added('follows', follow._id, follow);
		},
		removed: function(follow){
			userHandles[follow.followerId] && userHandles[follow.followerId].stop();
			self.removed('follows', follow._id);
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
	return Posts.find({$or:[{userId: {$in: following()}}, {userId: this.userId}], replyTo:null},{sort:{timestamp:-1}, limit:limit});
});
