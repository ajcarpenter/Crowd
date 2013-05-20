Template.timeline.helpers({
	options: function() {
		return {
			template:'postCard',
			showCompose: !!Meteor.userId(),
			paginationHandle: timelineHandle,
			collection: function(){
				var following = Follows.find({followerId: Meteor.userId()}).map(function(follow){return follow.userId;});
				return Posts.find({replyTo:null, userId: {$in: following}},{sort:{timestamp:-1}, limit: timelineHandle.limit()});
			}
		};
	}
});

Template.followers.helpers({
	options: function() {
		return {
			template:'userCard',
			showCompose: false,
			collection: function(){
				var followers = Follows.find({userId: Meteor.userId()}).map(function(follow){return follow.followerId});
				return Meteor.users.find({_id: {$in: followers}});
			}
		};
	}
});

Template.following.helpers({
	options: function() {
		return {
			template:'userCard',
			showCompose: false,
			collection: function(){
				var followers = Follows.find({followerId: Meteor.userId()}).map(function(follow){return follow.userId});
				return Meteor.users.find({_id: {$in: followers}});
			}
		};
	}
});

Template.userPosts.helpers({
	options: function() {
		return {
			template:'postCard',
			showCompose: Session.get('currentUserId') === Meteor.userId(),
			collection: function(){
				return Posts.find({userId: Session.get('currentUserId'), replyTo:null},{sort:{timestamp:-1}});
			}
		};
	}
});



Template.cardGrid.helpers({
	rows:function(){
		var i = 1,
			rows = [],
			cells = [],
			rowIndex = 0,
			options = this;

		var cellIndex = options.showCompose ? 1 : 0;

		var gridWidth = 4;

		options.collection().map(function(doc) {
			if(cellIndex >= gridWidth){
				rowIndex++;
				cellIndex = 0;
			}

			if(!rows[rowIndex]){
				rows[rowIndex] = {cells: [], showCompose: rowIndex === 0 && options.showCompose};
			}

			rows[rowIndex].cells[cellIndex++] = _.extend(doc, {template: options.template});

			return doc;
	    });

	    if(rows.length > 0 && rows[rows.length - 1].cells.length < gridWidth){
	    	rows[rows.length - 1]['rowLast'] = true;
	    	rows[rows.length - 1]['paginationHandle'] = options.paginationHandle;

	    } else {
	    	rows.push({rowLast: true, paginationHandle: options.paginationHandle});
	    }

	    return rows;
	},
	isFlipped: function(){
		return _.contains(Session.get('flippedCards'),this._id);
	},
	usesTemplate: function(template){
		return this.template === template;
	},
	showLoadMore: function(rowLast){
		return !!this.paginationHandle && rowLast;
	}
});
