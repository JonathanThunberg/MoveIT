
var data = {
  labels: [''],
  series: [
    [0]
  ]
};

var options = {
  showPoint: false,
  axisX: {
    showGrid: false,
    showLabel: false
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0,
  },
  low: 0,
  showArea: true,
  chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
};

updateChart = function(id, pointsName, numPoints) {
  var points = Session.get(pointsName).slice(0, numPoints);
  data.series[0] = points;
  data.labels = Array.apply(null, new Array(numPoints)).map(function(){return ''})
  options.width = $(window).width();
  options.height = $(window).height() / 3;
  new Chartist.Line('#' + id, data, options);
};

emulateData = function() {
  var data = [50];
  for (var i = 1; i < 100; i++) {
    data.push(50 + (Math.random() - 0.5)*20);
  }
  Session.set('activityPoints', data);
}

if (Meteor.isClient) {
  // Create temp data
  Router.onAfterAction(function () {
    emulateData();
  }, {only: ['statsView']});

  Template.statsView.rendered = function() {
    updateChart('activityChart', 'activityPoints', 8);
  }

  Template.statsView.helpers({
    // Data context for activity chart:
    activityChartTabs: [
      { type: 'Day', points: 8, active: 'active' },
      { type: 'Week', points: 8*7, active: '' },
      { type: 'Month', points: 30, active: '' }
    ]});

    Template.activityChartTab.events({
      'click': function () {
        updateChart('activityChart', 'activityPoints', this.points);
      }
    });
  }
