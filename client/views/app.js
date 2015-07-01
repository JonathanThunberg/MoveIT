if (Meteor.isClient) {
  // Set up routes
  Router.route('/',
    function () {
      this.render('mainView');
    }, {
      name: 'main'
    }
  );
  Router.route('/statsView', { name: 'stats' });
  Router.route('/settingsView', { name: 'settings' });

}
