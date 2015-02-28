(function(){
    'use strict';
    angular.module('example-authen')
        .controller('SignupCtrl', SignupCtrl);

    /////////////////////////////////////

    SignupCtrl.$inject = ['$scope', '$state', 'Auth'];
    function SignupCtrl($scope, $state, Auth){
        $scope.errorMessage = '';
        $scope.signup = signup;
        $scope.user = {
            email: 'suratin.elec@gmail.com',
            password: 'option'
        }

        function signup(){
            Auth.signup($scope.user, function(user){
                $state.go('login');
            }, function(err){
                $scope.errorMessage = err.message;
            });
        }
    }
})();