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
		return Meteor.users.findOne(this.userId);
	}
});

Template.postCard.rendered = function(){
	var instance = this;
	var $post = instance.data._$postElem = $(instance.firstNode);
}