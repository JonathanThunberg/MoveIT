var data = {
    labels: [],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        }
    ]
};

var activityChart;

var options = {
  showScale: false,
  showTooltips: false,
  skipLabels: true,
  pointDot: false,
  animationSteps: 1
}

updateChart = function(chart, pointsName, numPoints) {
  var points = Session.get(pointsName);
  console.log(chart.datasets[0].points.length);
  for(var n = chart.datasets[0].points.length; n > 0; n--) {
    chart.removeData();
  }
  for(var n = 0; n < numPoints; n++) {
    chart.addData([n], '');
  }
  chart.update();
};

createChart = function(id) {
  var context = document.getElementById(id).getContext('2d');
  context.canvas.width = $(window).width();
  context.canvas.height = $(window).height() / 3;
  activityChart = new Chart(context).Line(data, options);
}

if (Meteor.isClient) {
  Meteor.startup(function () {
    createChart('activityChart');
    updateChart(activityChart, 'activityPoints', 24);
  });

  Template.statsView.helpers({
    // Data context for activity chart:
    activityChartTabs: [
      { type: 'Day', points: 24, active: 'active' },
      { type: 'Week', points: 7, active: '' },
      { type: 'Month', points: 30, active: '' }
    ]});

  Template.activityChartTab.events({
    'click': function () {
      updateChart(activityChart, 'activityPoints', this.points);
    }
  });
}
