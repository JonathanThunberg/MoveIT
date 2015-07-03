if (Meteor.isClient) {
        
    //Expecting a set of information
    /*
        {
            title : string,
            valueref : string,
            activeref : string,
            min : number,
            max : number,
            titleformat : string;
        }
    */
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
    if(minutes===undefined) {return "00:00"};
    var h = Math.floor(minutes/60);
    var m = minutes%60;
    return (h<10?"0":"")+h+":"+
           (m<10?"0":"")+m;
}
