

function barHeight() {
  return Math.ceil($('.LeftContent').height() * Session.get('counter') / 100);
}

function updateActivity() {
  var height = barHeight();
  $('.ActivityBar').animate({
    height: ($('.LeftContent').height() - height)+"px"
  }, 100);
  $('.ActivityBarFill').animate({
    height: height + "px"
  }, 100);
}

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // all settings enabled by default for now
  Session.setDefault('alarmUseSound', true);
  Session.setDefault('alarmUseVibration', true);
  Session.setDefault('alarmUseLight', true);
  Session.setDefault('main_is_hidden', false);
  Session.setDefault('stat_is_hidden', true);
  Session.setDefault('sett_is_hidden', true);

  Meteor.startup(function () {
    updateActivity();
  });

  // navigation
  Template.navigationbar.onRendered(function(){
    $(".button-collapse").sideNav();
  });

  Template.navmoveitem.events({
    'click' : function() {
      Session.set('main_is_hidden', false);
      Session.set('stat_is_hidden', true);
      Session.set('sett_is_hidden', true);
      updateActivity();
    }
  })
  Template.navstatitem.events({
    'click' : function() {
      Session.set('main_is_hidden', true);
      Session.set('stat_is_hidden', false);
      Session.set('sett_is_hidden', true);
      updateActivity();
    }
  })
  Template.navsettitem.events({
    'click' : function() {
      Session.set('main_is_hidden', true);
      Session.set('stat_is_hidden', true);
      Session.set('sett_is_hidden', false);
      updateActivity();
    }
  })

  Template.stats.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.step.events({
    'click': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      updateActivity();
    }
  });

  Template.body.helpers({
    // Data context for alarm settings buttons:
    alarmSettings: [
      { type: 'Sound',
        icon_enabled: 'volume_up',
        icon_disabled: 'volume_off' },

      { type: 'Vibration',
        icon_enabled: 'alarm_on',
        icon_disabled: 'alarm_off' },

      { type: 'Light',
        icon_enabled: 'phonelink_ring',
        icon_disabled: 'phonelink_erase' }
    ],

    hidemain : function() {
      return Session.get("main_is_hidden");
    },
    hidestat : function() {
      return Session.get("stat_is_hidden");
    },
    hidesett : function() {
      return Session.get("sett_is_hidden");
    }

  });

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
}
