Template.userLink.events({
	'mouseenter .user-link': function(e){
		e.target.appendChild(Template.userLinkFlyout());
	}
})