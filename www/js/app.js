angular.module('qtraApp', ['ionic', 'ionic.utils', 'qtra.controllers', 'qtra.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // login page (default view if not logged in)
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController',
    data: {
      requireLogin: false
    }
  })

  // logout page
  .state('logout', {
    url: '/logout',
    templateUrl: 'templates/logout.html',
    controller: 'LoginController'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.projects', {
      url: '/projects',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-projects.html',
          controller: 'ProjectsController'
        }
      }
    })
    .state('tab.project-detail', {
      url: '/projects/:projectId',
      views: {
        'tab-projects': {
          templateUrl: 'templates/project-detail.html',
          controller: 'ProjectDetailController'
        }
      }
    })
    .state('tab.tree-detail', {
      url: '/projects/:projectId/:treeId',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tree-detail.html',
          controller: 'TreeDetailController'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'LoginController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
