Template.postCard.events({
	'click .post-card': function(){
		Meteor.Router.to('singleCard', this._id);   
	},
	'click .post-flip': function(e,template){
		e.stopPropagation();

		var $post = template._$post;

		$post.css('webkitAnimationName','card-flip-out');

		$post.one('webkitAnimationEnd', function(){
			$post.css('webkitAnimationName','card-flip-in');

			$post.find('.post-front, .post-back').toggleClass('invisible');

			$post.one('webkitAnimationEnd', function(){
				$post.css('webkitAnimationName','');

			});
		});
	}
});

Template.postCard.helpers({
	canFlip: function(){
		return !!this._img;
	},
	user: function(){
		//We've packaged the username in the post so simulate the full user object
		return {_id: this.userId, username: this.author};
	}
});

Template.postCard.rendered = function(){
	var instance = this;

	if(!instance._$post){
		var $post = instance._$post = $(instance.firstNode);
	} else {
		$post.css('webkitAnimationName','fade-in');

		$post.one('webkitAnimationEnd', function(){
			$post.css('webkitAnimationName','');
		});
	}
}