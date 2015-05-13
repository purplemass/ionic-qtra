angular.module('starter.services', [])

.service('LoginService', function($q, $localstorage) {

  return {
    loginUser: function(user, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if ( (user == 'bob' && pw == 'bob') || (user == 'oliver' && pw == 'oliver') ) {
        this.setUser(user);
        deferred.resolve('Welcome ' + user + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    },
    isLoggedIn: function() {
      if ($localstorage.get('loggedin') === "true") {
        return true;
      } else {
        return false;
      }
    },
    getUser: function() {
      return $localstorage.get('user');
    },
    setUser: function(user) {
      $localstorage.set('loggedin', "true");
      $localstorage.set('user', user);
    },
    clearUser: function() {
      $localstorage.set('loggedin', "");
      $localstorage.set('user', "");
    }
  }
})

.factory('Projects', function($q, $http) {
  var projectsURL = 'js/data/projects.json';
  var projects = [];
  var deferred = $q.defer();
  var promise = deferred.promise;
  $http.get(projectsURL)
    .success(function (data, status, headers, config) {
      projects = data;
      deferred.resolve(data);
    })
    .error(function(error) {
      console.log('ERROR', error);
      deferred.reject([]);
    });

  return {
    all: function() {
      console.log(deferred.promise);
      return deferred.promise;
    },
    remove: function(project) {
      projects.splice(projects.indexOf(project), 1);
    },
    get: function(projectId) {
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === parseInt(projectId)) {
          return projects[i];
        }
      }
      return null;
    }
  };
});
