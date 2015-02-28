(function(){
    'use strict';
    angular.module('example-authen')
        .controller('LoginCtrl', LoginCtrl);

    /////////////////////////////////////

    LoginCtrl.$inject = ['$scope', '$timeout', '$state', 'Auth'];
    function LoginCtrl($scope, $timeout, $state, Auth){
        $scope.errorMessage = '';
        $scope.user = {
            email: 'suratin.elec@gmail.com',
            password: 'option'
        }
        $scope.login = login;

        function login(){
            Auth.login($scope.user, function(user, isAdmin){
                $timeout(function(){
                    $state.go('profile');
                });
            }, function(err){
                $scope.errorMessage = err.message;
            });
        }
    }
})();