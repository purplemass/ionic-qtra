angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $localstorage) {
  $scope.data = {};

  $scope.login = function() {
    // debug
    console.log("loggedin: \t" + $localstorage.get('loggedin'));

    LoginService.loginUser($scope.data.username, $scope.data.password)
      .success(function(data) {
        $localstorage.set('user', $scope.data.username);
        $localstorage.set('loggedin', true);
        $state.go('tab.dash');
      })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
      });
    });
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
