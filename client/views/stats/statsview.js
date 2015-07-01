var data = {
    labels: ['', '', '', 'asdas', '', '', ''],
    datasets: [
        {
            label: "Todays avarage activity",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

var options = {
  showScale: false,
  showTooltips: false,
  skipLabels: true
}

if (Meteor.isClient) {

  Template.statsView.rendered = function(event, template) {
    var context = this.find('#ActivityChart').getContext('2d');
    context.canvas.width = $(window).width();
    context.canvas.height = $(window).height() / 3;
    new Chart(context).Line(data, options);
  };
}
