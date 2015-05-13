angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $ionicHistory, $state) {
  $scope.data = {};

  console.log(LoginService.isLoggedIn());
  if (LoginService.isLoggedIn() === true) {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('tab.dash');
  }

  $scope.login = function() {

    console.log("loggedin: \t" + LoginService.isLoggedIn());

    LoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function(data) {
        $state.go('tab.dash');
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
