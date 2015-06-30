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

  Meteor.startup(function () {
    updateActivity();
  });

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
}
