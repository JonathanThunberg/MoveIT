if (Meteor.isClient) {

	Template.checkboxinput.events({
	    'change': function() {
	        Session.set(this.reference, !Session.get(this.reference));
	    }
	});

	Template.checkboxinput.helpers({
	    'selected': function() {
	      if(Session.get(this.reference)) {
	        return 'checked';
	      } else {
	        return '';
	      }
	    }
	});
}
