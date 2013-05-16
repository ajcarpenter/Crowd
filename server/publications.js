Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('replies', function(postId){
	return Posts.find({replyTo:postId});
});