

if (Meteor.isClient) {
  // Set up on-load function:
  Router.onAfterAction(function () {

  }, {only: ['main']});

  // counter starts at 0
  Session.setDefault('counter', 0);

  Session.setDefault('sliderx', 0);

  // all settings enabled by default for now
  Session.setDefault('alarmUseSound', true);
  Session.setDefault('alarmUseVibration', true);
  Session.setDefault('alarmUseLight', true);

  Template.stats.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.step.events({
    'click': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.dragelement.rendered = function(){
    $('#slider').animate({
      top: "+="+100+"px"
    }, 0);
  }

  Template.dragelement.events({
    'click': function(){
    },
    'touchstart': function(){
    },
    'touchend': function(){

    },
    'touchmove': function(e){
      e.stopPropagation();
      e.preventDefault();
      var currentY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
      var act =$('.BarContainer');
      var actpos = act.position();
      var biggerValue = (act.height()+(actpos.top));
      var slider = $('#slider');
      if(currentY<(act.height()+(actpos.top)-(slider.height()/2)) && currentY>(actpos.top)-(slider.height()/2)){
        slider.animate({
          top: currentY+"px"
        }, 0);
      }
    }
  });
  //---------------------------
  // Activity Bar
  //---------------------------
  Template.activityBar.helpers({
    fillHeight: function () {
      return 100 - Session.get('counter');
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
