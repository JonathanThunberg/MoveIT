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
    	'reference' : function() { 
    		return  {
	    		title : this.name,
	    		valueref : 'time'+this.name,
	    		activeref : '',
	    		min : 0,
	    		max : 1435,
	    		titleformat : function() {
	    			return this.title + ": "+
	    			 minutesTohhmm(Session.get(this.valueref));
	    		}
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

    	sliderhidden : function() {
    		if(Session.get('alarmUse' + this.name)){ 
    			return '';
    		}
    		return 'hidden';

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
    	reference : function() { 
    		return  {
	    		title : this.name,
	    		valueref : 'alarmIntensity'+this.name,
	    		activeref : 'alarmUse'+this.name,
	    		min : 0,
	    		max : 100
    		}
    	}
    });


    Template.sliderinput.helpers({
		level : function() { 
    		return ""+Session.get(this.valueref);
    	},
		sliderhidden : function() {
    		var b = Session.get(this.activeref);
    		if(b ===undefined || b){ 
    			return '';
    		}

    		return 'hidden';

    	}
    });

    Template.sliderinput.events({
    	'input': function() { 
    		var v = $("#input_slider_"+this.title).val();
    		v = v - (v%5) + ((v%5>2.5)? 5 : 0);
    		Session.set(this.valueref, v);

    	}
    });

    Template.sliderinputtitled.helpers({
		level : function() { 
    		return ""+Session.get(this.valueref);
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