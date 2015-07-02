if (Meteor.isClient) {
	
  Template.weekdaysettings.helpers({
    
    day: [
      {name: 'Monday'},
      {name: 'Tuesday'},
      {name: 'Wednesday'},
      {name: 'Thursday'},
      {name: 'Friday'},
      {name: 'Saturday'},
      {name: 'Sunday'}
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

    Template.timeselectsettings.helpers({ 
    	event : [ 
    		{name: 'Starts'},
    		{name: 'Ends'}
    		]
    })
    Template.timeselectitem.helpers({ 
    	'time' : function() { 
    		return Session.get('time'+this.name);
    	} ,
    	'formattedtime' : function() { 
    		return minutesTohhmm(Session.get('time'+this.name));
    	}

    });

    Template.timeslider.events({ 
    	'change': function() { 
    		var v = $("#time_slider_"+this.name).val();
    			Session.set('time'+this.name, v);
    	},
    	'input': function(){
    	    var v = $("#time_slider_"+this.name).val();
    		if(v){ 
    			Session.set('time'+this.name,v);
    		}
    	}
    });


}


  	function minutesTohhmm(minutes){
  		if(minutes===undefined) {return "0:00"};
  		var h = Math.floor(minutes/60);
  		var m = minutes%60;
  		return (h<10?"0":"")+h+":"+
  			   (m<10?"0":"")+m;
  	}