Template.newPostCard.events({
	'keydown .new-post-input': function(e){
		if(e.which === 13){
			e.preventDefault();
			$target = $(e.target);

			Meteor.call('post',{
				message:$target.val()
			});

			$target.val('');
		}
	}
});