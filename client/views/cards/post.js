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
	},
	user: function(){
		//We've packaged the username in the post so simulate the full user object
		return {_id: this.userId, username: this.author};
	}
});

Template.postCard.rendered = function(){
	var instance = this;
	var $post = instance.data._$postElem = $(instance.firstNode);
}