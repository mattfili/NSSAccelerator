angular.module('valueprop')

.controller('main', function($scope, FIRE_OBJ, FIRE_ARRAY, GET_FIRE, FIRE_COMMENT, $uibModal, $log, $stateParams, $state, $rootScope) {

	var vm = this;

	vm.animationsEnabled = true;

	vm.addConsideration = function () {
		var modalInstance = $uibModal.open({
	      animation: vm.animationsEnabled,
	      templateUrl: 'assets/components/addConsid.html',
	      controller: 'considModalCtrl'
	    });

	    modalInstance.result.then(function(formData) {
	    	FIRE_ARRAY.$add(formData).then(function(result) {
	    		console.log(result.ref());
	    	})
	    })
	
	}

  vm.addComment = function () {
    var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'assets/components/addComment.html',
        controller: 'commModalCtrl'
      });

      modalInstance.result.then(function(formData) {
        FIRE_COMMENT.$add(formData).then(function(result) {
          console.log(result.ref());
        })
      })
  
  }
	

  $rootScope.$on('$stateChangeStart', function (toState, fromState) {
    console.log(toState)
    console.log(fromState)

   if (fromState.name === 'start.dash.consid') {
    $rootScope.params = true

    GET_FIRE.on('value', function (snap) {
      vm.comments = snap.val()
  }, function (errorObject) { 
      console.log("The read failed: " + errorObject.code);
  })
   } else if (fromState.name === 'start.dash') {
    $rootScope.params = false
   }

  })

    $rootScope.$on('$stateChangeSuccess', function (toState, fromState) {
    console.log(toState)
    console.log(fromState)

   if (fromState.name === 'start.dash') {
      $rootScope.$broadcast('iso-init', {name:null, params:null})

   } 

  })



})



.controller('commModalCtrl', function ($modalInstance, $scope) {

	var vm = this;

	$scope.formData = {
		title: '',
		summary: '',
		content: ''
	}

  $scope.ok = function () {
    $modalInstance.close($scope.formData);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.controller('considModalCtrl', function ($modalInstance, $scope) {

	var vm = this;

	$scope.formData = {
		description: '',
		user: '',
		job: ''
	}

  $scope.ok = function () {
    $modalInstance.close($scope.formData);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

.controller('considCtrl', function (FIRE, $scope, $stateParams, $state, $uibModal, $rootScope) {

	var vm = this;

	FIRE.on('value', function (snap) {
		$scope.consid = snap.val()
	}, function (errorObject) {	
		console.log("The read failed: " + errorObject.code);
	})




  vm.changeState = _.debounce(function() {
    $rootScope.$broadcast('iso-init', {name:null, params:null})
     // $scope.$emit('iso-method', {name: reloadItems, params:null});
    $state.go('start.dash')
  }, 1000)



})



.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
    $scope.email = null;
    $scope.pass = null;
    $scope.confirm = null;
    $scope.createMode = false;

    $scope.login = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({ email: email, password: pass }, {rememberMe: true})
        .then(function(/* user */) {
          console.log('logged in');
          alert('logged in')
        }, function(err) {
          $scope.err = errMessage(err);
        });
    };

    $scope.createAccount = function() {
      $scope.err = null;
      if( assertValidAccountProps() ) {
        var email = $scope.email;
        var pass = $scope.pass;
        // create user credentials in Firebase auth system
        Auth.$createUser({email: email, password: pass})
          .then(function() {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({ email: email, password: pass });
          })
          .then(function(user) {
            // create a user profile in our data store
            var ref = fbutil.ref('users', user.uid);
            return fbutil.handler(function(cb) {
              ref.set({email: email, name: name||firstPartOfEmail(email)}, cb);
            });
          })
      }
    };

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass || !$scope.confirm ) {
        $scope.err = 'Please enter a password';
      }
      else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
        $scope.err = 'Passwords do not match';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  }]);
