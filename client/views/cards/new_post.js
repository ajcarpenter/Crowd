Template.newPostCard.events({
	'keydown .new-post-input': function(e){
		if(e.which === 13){
			$target = $(e.target);

			Posts.insert({
				author:'acarpenter', 
				content:$target.val(), 
				timestamp: new Date().getTime()
			});

			$target.val('');
		}
	}
});