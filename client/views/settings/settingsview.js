if (Meteor.isClient) {
	
  Template.weekdaysettings.helpers({
    day: [
      {text:'Monday'},
      {text: 'Tuesday'},
      {text: 'Wednesday'},
      {text: 'Thursday'},
      {text: 'Friday'},
      {text: 'Saturday'},
      {text: 'Sunday'}
    ]
  });

  Template.weekdayitem.helpers({ 
    	'reference' : function() { 
    		return  {
	    		text : this.text,
	    		reference : 'weekday_active_'+this.text
    		}
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
		checkboxReference : function(){
			return {
				reference : 'alarmUse' + this.name,
				icon : this.icon, 
				text : this.name
			}
		},
    	sliderReference : function() { 
    		return  {
	    		title : this.name,
	    		valueref : 'alarmIntensity'+this.name,
	    		activeref : 'alarmUse'+this.name,
	    		min : 0,
	    		max : 100
    		}
    	}
    });

    function minutesTohhmm(minutes){
    if(minutes===undefined) {return "00:00"};
    var h = Math.floor(minutes/60);
    var m = minutes%60;
    return (h<10?"0":"")+h+":"+
           (m<10?"0":"")+m;
	}


    

    

    
}
