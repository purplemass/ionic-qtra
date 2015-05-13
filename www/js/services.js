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

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var projects = [{
    id: 0,
    name: 'Project Name 1',
    lastText: 'Project description 1',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Project Name 2',
    lastText: 'Project description 2',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Project Name 3',
    lastText: 'Project description 3',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Project Name 4',
    lastText: 'Project description 4',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return projects;
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
