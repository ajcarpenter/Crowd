Template.loadMoreCard.events({
	'click #load-more-card': function() {
		var elem = document.getElementById('refresh-vector');
		elem.style.webkitAnimationName = 'refresh-rotate';

		elem.addEventListener('webkitAnimationEnd', function(){
			this.style.webkitAnimationName = '';
		}, false);

		this.paginationHandle.loadNextPage();
	}
});