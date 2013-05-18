Template.userPanel.helpers({
  activeRouteClass: function(/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();    

    var active = _.any(args, function(name) {
      return location.pathname === Meteor.Router[name + 'Path']();
    });

    return active && 'active';
  },
  imageURL: function(){
  	var user = Meteor.user();

  	return (user && user.profile && user.profile.imageURLs && user.profile.imageURLs.card) || '/img/nopic.jpg';
  }
});