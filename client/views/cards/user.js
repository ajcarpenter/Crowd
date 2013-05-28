Template.userCard.events({
	'click .post-flip': function(e,instance){
		e.stopPropagation();

		var $card = instance._$card;

		$card.css('webkitAnimationName','card-flip-out');

		$card.one('webkitAnimationEnd', function(){
			$card.css('webkitAnimationName','card-flip-in');

			$card.find('.post-front, .post-back').toggleClass('invisible');

			$card.one('webkitAnimationEnd', function(){
				$card.css('webkitAnimationName','');

			});
		});
	}
});

Template.userCard.helpers({
	tags: function(){
		var follow = Follows.findOne({userId: this._id, followerId: Meteor.userId()});
		return follow && follow.tags;
	}
});

Template.userCard.rendered = function(){
	var instance = this;
	instance._$card = $(instance.firstNode);
}