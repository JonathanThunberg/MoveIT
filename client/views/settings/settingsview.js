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
	      if(Session.get('active' + this.name)) {
	        return 'checked';
	      } else {
	        return '';
	      }
	    }
	});

    Template.weekdaysettingsitem.events({
	    'change': function() {
	        Session.set('active' + this.name, !Session.get('active' + this.name));
	    }
	});

    Template.timeselectsettings.helpers({ 
    	event : [ 
    		{name: 'Starts'},
    		{name: 'Ends'}
    		]
    })
    Template.timeselectitem.helpers({ 
    	'formattedtime' : function() { 
    		return minutesTohhmm(Session.get('time'+this.name));
    	}

    });

    Template.timeslider.helpers({
    	'time' : function() { 
    		return Session.get('time'+this.name);
    	} 
    })

    Template.timeslider.events({ 
    	'change': function() { 
    		var v = $("#time_slider_"+this.name).val();
    		v = v - (v%5) + ((v%5>2.5)? 5 : 0);
    		Session.set('time'+this.name, v);
    	},
    	'input': function(){
    	    var v = $("#time_slider_"+this.name).val();
    		v = v - (v%5) + ((v%5>2.5)? 5 : 0);
    		if(v){ 
    			Session.set('time'+this.name,v);
    		}
    	}
    });

	Template.alarmsettings.helpers({ 
    	event : [ 
    		{
    			name: 'Sound',
    			icon: 'volume_up'
    		},
    		{
    			name: 'Vibration',
    			icon: 'alarm_on'
    		},
    		{
    			name: 'Light',
    			icon: 'phonelink_ring'
    		}
    	]
    });

	Template.alarmsettingsrow.helpers({ 
    	alarmselected : function() { 
    		return Session.get('alarmUse' + this.name);
    	},


    	sliderdisabled : function() { 
    		if(Session.get('alarmUse' + this.name)){ 
    			return '';
    		}
    		return 'disabled';
    	}
    });

	Template.alarmsettingscheck.helpers({ 
    	alarmselected : function() { 
    		return Session.get('alarmUse' + this.name);
    	}
    });


    

    Template.alarmsettingscheck.events({
	    'change': function() {

	      Session.set('alarmUse' + this.name, !Session.get('alarmUse' + this.name));
	    }
	});
    
	Template.alarmsettingsslider.helpers({ 
    	sliderdisabled : function() { 
    		if(Session.get('alarmUse' + this.name)){ 
    			return '';
    		}
    		return 'disabled';
    	},
    	intensity : function() { 
    		return ""+Session.get('alarmIntensity'+this.name);
    	}
    });
    Template.alarmsettingsslider.events({ 
    	'change': function() { 
    		var v = $("#alarm_slider_"+this.name).val();
    		Session.set('alarmIntensity'+this.name, v);
    	},
    	'input': function(){
    	    var v = $("#alarm_slider_"+this.name).val();
    		Session.set('alarmIntensity'+this.name, v);
    	}
    });


}

	

  	function minutesTohhmm(minutes){
  		if(minutes===undefined) {return "0:00"};
  		var h = Math.floor(minutes/60);
  		var m = minutes%60;
  		var b;
  		return (h<10?"0":"")+h+":"+
  			   (m<10?"0":"")+m;
  	}