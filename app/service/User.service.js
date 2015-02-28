(function(){
    'use strict';
    angular.module('example-authen.service')
        .factory('User', User);

    //////////////////////////////////////////////////////////////////

    User.$inject = ['$firebase', '$q', 'FireFactory'];
    function User($firebase, $q, FireFactory){
        return {
            get: get
        };

        function get(uid){
            uid = uid.replace('simplelogin:', '').replace('facebook:', '');
            var deferred = $q.defer();
            var userProfile = $firebase(FireFactory.firebaseRef('user/' + uid)).$asObject();
            var adminProfile = $firebase(FireFactory.firebaseRef('admin/' + uid)).$asObject();
            userProfile.$loaded(function(data){
                if(data.$value === null){
                    // check on admin collection
                    adminProfile.$loaded(function(data){
                        if(data.$value !== null){
                            deferred.resolve(data);
                        }
                    }, function(err){
                        deferred.reject(err);
                    });

                }else{
                    deferred.resolve(data);
                }
                return deferred.promise;
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();