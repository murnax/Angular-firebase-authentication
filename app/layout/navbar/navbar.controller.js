(function(){
    'use strict';
    angular.module('example-authen')
        .controller('NavbarCtrl', NavbarCtrl);

    /////////////////////////////////////

    NavbarCtrl.$inject = ['$scope', 'Auth'];
    function NavbarCtrl($scope, Auth){
        $scope.logout = logout;
        $scope.isLoggedIn = false;

        $scope.$watch(function(){ return Auth.getCurrentUser() }, function(newVal, oldVal){
            if(newVal){
                if(newVal.hasOwnProperty('level')){
                    $scope.isLoggedIn = true;
                }else{
                    $scope.isLoggedIn = false;
                }
            }

        });

        function logout(){
            Auth.logout();
        }
    }
})();