(function(){
    'use strict';
    angular.module('example-authen.service')
        .factory('FireFactory', FireFactory);

    /////////////////////////////////////

    FireFactory.$inject = ['$firebase'];
    function FireFactory($firebase){
        var baseUrl = 'https://flickering-inferno-8483.firebaseio.com';

        return {
            firebaseRef: firebaseRef
        }

        function firebaseRef(path){
            path = (path !== '') ? baseUrl + '/' + path : baseUrl;
            return new Firebase(path);
        }
    }
})();