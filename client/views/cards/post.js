Template.postCard.events({
	'click .post-card': function(){
		Meteor.Router.to('singleCard', this._id);   
	},
	'click .post-flip': function(e){
		e.stopPropagation();

		var post = this;

		post._$postElem.css('webkitAnimationName','card-flip-out');

		post._$postElem.one('webkitAnimationEnd', function(){
			post._$postElem.css('webkitAnimationName','card-flip-in');

			post._$postElem.find('.post-front, .post-back').toggleClass('invisible');

			post._$postElem.one('webkitAnimationEnd', function(){
				post._$postElem.css('webkitAnimationName','');

			});
		});
	}
});

Template.postCard.helpers({
	canFlip: function(){
		return !!this._img;
	}
});

Template.postCard.rendered = function(){
	var instance = this;
	var $post = instance.data._$postElem = $(instance.firstNode);
/*
	var newPosition = $post.offset();

	if(instance._currentPosition){
		var previousPosition = instance._currentPosition;

		$post.css({
			top: (previousPosition.top - newPosition.top) + 'px',
			left: (previousPosition.left - newPosition.left) + 'px',
		});
	}

	Meteor.defer(function(){
		instance._currentPosition = newPosition;

		$post.css({
			top: '0',
			left:'0'
		});
	});*/
}