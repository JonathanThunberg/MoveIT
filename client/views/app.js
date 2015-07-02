if (Meteor.isClient) {
  // Set up routes
  Router.route('/',
    function () {
      this.render('mainView');
    }, {
      name: 'main'
    }
  );
  Router.route('/statsView')
  Router.route('/settingsView');
}
