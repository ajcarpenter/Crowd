Template.timeline.helpers({
	options: function() {
		return {
			template:'postCard',
			collection: Posts,
			filter: {replyTo:null},
			options: {sort:{timestamp:-1}},
			showCompose: !!Meteor.userId()
		};
	}
});

Template.followers.helpers({
	options: function() {
		return {
			template:'userCard',
			collection: Follows,
			filter: {userId: Meteor.userId()},
			options: {},
			showCompose: false
		};
	}
});

Template.following.helpers({
	options: function() {
		return {
			template:'userCard',
			collection: Follows,
			filter: {followerId: Meteor.userId()},
			options: {},
			showCompose: false
		};
	}
});

Template.userPosts.helpers({
	options: function() {
		return {
			template:'postCard',
			collection: Posts,
			filter: {userId: Session.get('currentUserId'), replyTo:null},
			options: {sort:{timestamp:-1}},
			showCompose: Session.get('currentUserId') === Meteor.userId()
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

		options.collection.find(options.filter, options.options).map(function(doc) {
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

	    if(rows.length > 0 && rows[rows.length - 1].cells.length < gridWidth)
	    	rows[rows.length - 1]['rowLast'] = true;
	    else
	    	rows.push({rowLast: true});

	    return rows;
	},
	isFlipped: function(){
		return _.contains(Session.get('flippedCards'),this._id);
	},
	usesTemplate: function(template){
		return this.template === template;
	}
});
