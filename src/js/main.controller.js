angular.module('valueprop')

.controller('main', function($scope, FIRE_OBJ, FIRE_ARRAY, $uibModal, $log) {

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

.controller('considCtrl', function (FIRE, $scope) {

	var vm = this;

	FIRE.on('value', function (snap) {
		$scope.consid = snap.val()
	}, function (errorObject) {	
		console.log("The read failed: " + errorObject.code);
	})
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
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }
  }]);
