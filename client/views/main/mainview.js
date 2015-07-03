

if (Meteor.isClient) {


  var walkingService = new walkService();

  // Set up on-load function:
  Router.onAfterAction(function () {

  }, {only: ['main']});


  Session.setDefault('sliderx', 0);

  // all settings enabled by default for now
  Session.setDefault('alarmUseSound', true);
  Session.setDefault('alarmUseVibration', true);
  Session.setDefault('alarmUseLight', true);


  Session.setDefault('sliderxSound', 20);
  Session.setDefault('sliderxVibration', 30);

  Template.stats.helpers({
    counter: function () {
      return Session.get('level');
    }
  });

  Template.step.events({
    'click': function () {
      // increment the level when button is clicked
      walkingService.senseMovement();
    }
  });

  Template.dragelement.rendered = function(){
    console.log("rendered");
    $('#slider'+this.sType).animate({
      top: "+="+this.pos+"px"
    }, 0);
  }

  Template.dragelement.events({
    'click': function(){
    },
    'touchstart': function(){
    },
    'touchend': function(){
      var newAl = 100-((Session.get('sliderxSound')/($('.BarContainer').height()))*100);
      var newAl2 = 100-((Session.get('sliderxVibration')/($('.BarContainer').height()))*100);
      console.log([newAl2]+"   "+[newAl]+"   "+[100,100,100]);
      walkingService.passToAlarm([newAl2],[newAl],[100]);
    },
    'touchmove': function(e){
      e.stopPropagation();
      e.preventDefault();
      var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;

      var act =$('.BarContainer');
      var actpos = act.position();
      var biggerValue = (act.height()+(actpos.top));
      var slider = $('#slider'+this.sType);
      currentY -= slider.height()*2;
      if(currentY<(act.height()+(actpos.top)-(slider.height()/2)-slider.height()*2) && currentY>(actpos.top)-(slider.height()/2)-slider.height()*2){
        Session.set('sliderx'+this.sType, currentY);
        slider.animate({
          top: currentY+"px"
        }, 0);
      }
    }
  });
  Template.dragelements.helpers({
    // Data context for alarm settings buttons:
    eachSlider: [
      { sType: 'Sound',
        src: "/linjesmile.png",
        pos: 100
        },

      { sType: 'Vibration',
        src: "/linjesmile2.png",
        pos: 200  }
    ]
  });

  //---------------------------
  // Activity Bar
  //---------------------------
  Template.activityBar.helpers({
    fillHeight: function () {
      return 100 - Session.get('level');
    }
  })

  //---------------------------
  // Quick settings buttons
  //---------------------------
  Template.alarmSettingBtn.events({
    'click': function () {
      Session.set('alarmUse' + this.type, !Session.get('alarmUse' + this.type));
    }
  });

  Template.alarmSettingBtn.helpers({
    'state': function() {
      if (Session.get('alarmUse' + this.type)) {
        return '';
      } else {
        return 'disabled';
      }
    },
    'icon': function() {
      if (Session.get('alarmUse' + this.type)) {
        return this.icon_enabled;
      } else {
        return this.icon_disabled;
      }
    }
  });

  Template.alarmSettings.helpers({
    // Data context for alarm settings buttons:
    alarmSettingsInfo: [
      { type: 'Sound',
        icon_enabled: 'volume_up',
        icon_disabled: 'volume_off' },

      { type: 'Vibration',
        icon_enabled: 'alarm_on',
        icon_disabled: 'alarm_off' },

      { type: 'Light',
        icon_enabled: 'phonelink_ring',
        icon_disabled: 'phonelink_erase' }
    ]
  });
}
