Posts = new Meteor.Collection('posts');

Meteor.methods({
	post: function(postAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401,'You need to login to post new stories');

		var post = _.extend(_.pick(postAttr,'message'), {
			userId: user._id,
			username: user.username,
			timestamp: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	},
	reply: function(postAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401,'You need to login to post replies');

		var replyingTo = Posts.findOne({_id: postAttr.replyTo});
		if(!replyingTo)		
			throw new Meteor.Error(403,'You are not replying to a valid post');

		var timestamp = new Date().getTime();
		var post = _.extend(_.pick(postAttr,'message','replyTo'), {
			userId: user._id,
			username: user.username,
			timestamp: timestamp
		});

		//Posts.update(replyingTo, {$set:{lastReply:timestamp}});
		var postId = Posts.insert(post);

		return postId;
	},
	seen: function(postId){
		Posts.find(postId,{$addToSet:{seenBy: Meteor.userId()}});
	}
});