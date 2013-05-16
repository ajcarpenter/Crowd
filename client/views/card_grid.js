Template.cardGrid.helpers({
	rows:function(){
		var i = 1;
		var rows = [];
		var cells = [];
		var rowIndex = 0;
		var cellIndex = 1;

		var gridWidth = 4;

		Posts.find({replyTo:null},{sort:{timestamp:-1}}).map(function(post) {
			if(cellIndex >= gridWidth){
				rowIndex++;
				cellIndex = 0;
			}

			if(!rows[rowIndex]){
				rows[rowIndex] = {cells: [], rowFirst: rowIndex === 0};
			}

			rows[rowIndex].cells[cellIndex++] = post;

			return post;
	    });

	    if(rows.length > 0 && rows[rows.length - 1].cells.length < gridWidth)
	    	rows[rows.length - 1]['rowLast'] = true;
	    else
	    	rows.push({rowLast: true});

	    return rows;
	},
	isFlipped: function(){
		return _.contains(Session.get('flippedCards'),this._id);
	}
});
