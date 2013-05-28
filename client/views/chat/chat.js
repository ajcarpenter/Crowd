Template.chat.events({
	'keydown .chat-input': function(e){
		if(e.which === 13){
			e.preventDefault();
			$target = $(e.target);

			Meteor.call('reply',{
				message: $target.val(),
				replyTo: this._id
			});
		}
	}
});

Template.chat.helpers({
	'replies':function(){
		var i = 0;

		//Return in the opposite sort order and reverse after alignment calculation
		var posts = Posts.find({replyTo: this._id}, {sort:{timestamp:1}});
		var postCount = posts.count();
		var lastReplyUserId;


		return posts.map(function(post){
			if(lastReplyUserId != post.userId) i++;

			if(i % 2 == 0)
				post._class = 'chat-row chat-row-right';
			else
				post._class = 'chat-row';

			lastReplyUserId = post.userId;

			return post;
		}).reverse();
	},
	'hasNoReplies':function(){
		return Posts.find({replyTo: this._id}).count() === 0;
	}
});