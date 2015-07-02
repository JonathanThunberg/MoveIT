if (Meteor.isClient) {
	
  Template.weekdaysettings.helpers({
    
    day: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]
  });


	Template.weekdaysettingsitem.helpers({
	    'selected': function() {
	      if(Session.get('active' + this.day)) {
	        return 'checked';
	      } else {
	        return '';
	      }
	    }
	});

    Template.weekdaysettingsitem.events({
	    'check': function() {
	      Session.set('active' + this.day, !Session.get('active' + this.day));
	    }
	});
}