angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $ionicHistory, $state) {
  $scope.data = {};

  var logUserIn = function() {
    $scope.loggeduser = LoginService.getUser();
    // must watch this!
    // it's an angular thing:
    // http://stsc3000.github.io/blog/2013/10/26/a-tale-of-frankenstein-and-binding-to-service-values-in-angular-dot-js/
    //
    $scope.$watch(
      function(){ return LoginService.getUser() },
      function(newVal) {
        $scope.loggeduser = newVal;
      }
    )

    // this is very bad as we have hard-coded route!!
    // must replace
    //
    if ($state.current.url != '/account') {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.dash');
    }
  }

  if (LoginService.isLoggedIn() === true) {
    logUserIn();
  }

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function(data) {
        logUserIn();
      })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
      });
    });
  }

  $scope.logout = function() {
    LoginService.clearUser();
  }

  $scope.gologin = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('login', false);
  }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
