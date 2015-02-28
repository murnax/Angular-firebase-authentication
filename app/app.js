(function(){
	'use strict';
	angular.module('example-authen', [
		'ui.router',
		'firebase',
        'example-authen.service'
	])
        .config(config)
        .run(run);

    /////////////////////////////////////

    function config($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }

    function run($state, $timeout, $rootScope, $location, Auth){

        $rootScope.$on('$stateChangeStart', function(event, next){
            Auth.isLoggedInAsync(function(loggedIn){
                if(next.authenticate){
                    if(!loggedIn){
                        $timeout(function(){
                            $location.path('/login');
                        });
                    }else{
                        if(next.access_level !== Auth.getCurrentUser().level){
                            $location.path('/login');
                        }
                    }
                }
            });
        });
    }
})();