Template.chat.events({
	'keydown .chat-input': function(e){
		if(e.which === 13){
			$target = $(e.target);

			Meteor.call('reply',{
				message: $target.val(),
				replyTo: this._id
			});

			$target.val('');
		}
	}
});

Template.chat.helpers({
	'replies':function(){
		var i = 0;
		var posts = Posts.find({replyTo: this._id}, {sort:{timestamp:-1}});
		var postCount = posts.count();

		return posts.map(function(post){
			if((postCount - i++) % 2 == 0)
				post._class = 'chat-row chat-row-right';
			else
				post._class = 'chat-row';

			return post;
		});
	},
	'hasNoReplies':function(){
		return Posts.find({replyTo: this._id}).count() === 0;
	}
});