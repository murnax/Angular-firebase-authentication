(function(){
    'use strict';
    angular.module('example-authen')
        .controller('ProfileCtrl', ProfileCtrl);

    /////////////////////////////////////

    ProfileCtrl.$inject = ['$scope', 'user', 'Auth'];
    function ProfileCtrl($scope, user, Auth){
        console.log(user);
        $scope.user = user;
        console.log($scope.user);
    }
})();