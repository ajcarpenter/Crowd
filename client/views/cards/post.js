Template.postCard.events({
	'click .post-card': function(){
		Meteor.Router.to('singleCard', this._id);   
	},
	'click .post-flip': function(e,instance){
		e.stopPropagation();

		var $post = instance._$post;

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
		return {_id: this.userId, username: this.username};
	}
});

Template.postCard.rendered = function(){
	var instance = this;
	var $post = instance._$post = $(instance.firstNode);
	var newPosition = $post.offset();


	//TODO: I don't think this will work since I don't think the elements
	//are being re-rendered when a new one is added.
	if(!instance._lastPosition){
		instance._animQueue = ['fade-in 1s'];
	} else {
		var positionDelta = {
			top: newPosition.top - instance._lastPosition.top,
			left: newPosition.left - instance._lastPosition.left
		};

		if(positionDelta.top === 0 && positionDelta.left > 0){
			//We're on same row. Just shifted right.
			$post.css({left:positionDelta.left});
			instance._animQueue = ['shift-card-right 0.5s'];
		} else {
			$post.css({top:positionDelta.top, left:positionDelta.left});
			instance._animQueue = ['fade-out 0.5s', 'shift-card-right 0.5s'];
		}
	}	

	instance._lastPosition = newPosition;

	$post.css('webkitAnimation',instance._animQueue.shift() || '');

	$post.on('webkitAnimationEnd', function(){
		$post.css('webkitAnimation',instance._animQueue.shift() || '');
	});
}