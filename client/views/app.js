if (Meteor.isClient) {
  // Set up routes
  Router.route('/', function () {
    this.render('mainView');
  });
  Router.route('/statsView');
  Router.route('/settingsView');

}
