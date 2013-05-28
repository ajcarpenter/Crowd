Template.userPanel.helpers({
  activeRouteClass: function(routeName,param) {
/*
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();    

    var active = _.any(args, function(name) {
      return 
    });*/

    var active = location.pathname === Meteor.Router[routeName + 'Path'](param);

    return active && 'active';
  },
  imageURL: function(){
  	var user = Meteor.user();

  	return (user && user.profile && user.profile.imageURLs && user.profile.imageURLs.card) || '/img/nopic.png';
  }
});