(function(){
    'use strict';
    angular.module('example-authen')
        .config(config);

    /////////////////////////////////////

    function config($stateProvider){
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl',
                authenticate: false
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl',
                authenticate: false
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/account/profile/profile.html',
                controller: 'ProfileCtrl',
                authenticate: true,
                access_level: 'user',
                resolve: {
                    user: function(Auth, User){
                        return Auth.getCurrentUserAsync();
                    }
                }
            })
    }
})();