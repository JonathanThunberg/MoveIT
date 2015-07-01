var activityChart;
var activityBaseData = {
  labels: [],
  datasets: [
    {
      fillColor: "#B3E5FC",
      strokeColor: "#0288D1",
      data: []
    }
  ]
};
var activityOptions = {
  responsive: true,
  showScale: false,
  showTooltips: false,
  skipLabels: true,
  pointDot: false,
  animationSteps: 1
}

updateChart = function(chart, pointsName, numPoints) {
  var points = Session.get(pointsName).slice();
  for(var n = chart.datasets[0].points.length; n > 0; n--) {
    chart.removeData();
  }
  for(var n = 0; n < numPoints; n++) {
    chart.addData([points[n]], '');
  }
  chart.resize();
  chart.update();
};

createChart = function(id) {
  var context = document.getElementById(id).getContext('2d');
  context.canvas.width = $(window).width();
  console.log(context.canvas.width);
  context.canvas.height = $(window).height() / 3;
  //if (!activityChart) {
    activityChart = new Chart(context).Line(activityBaseData, activityOptions);
  //}
}


emulateData = function() {
  var data = [1.5];
  for (var i = 1; i < 100; i++) {
    data.push(data[i - 1] + Math.random() - 0.5);
  }
  Session.set('activityPoints', data);
}

if (Meteor.isClient) {
  // Create temp data
  Router.onAfterAction(function () {
    emulateData();
  }, {only: ['statsView']});

  Template.statsView.rendered = function() {
    createChart('activityChart');
    updateChart(activityChart, 'activityPoints', 8);
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
        updateChart(activityChart, 'activityPoints', this.points);
      }
    });
  }
