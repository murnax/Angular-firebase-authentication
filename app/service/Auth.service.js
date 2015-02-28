(function(){
    'use strict';
    angular.module('example-authen.service')
        .factory('Auth', Auth);

    /////////////////////////////////////

    Auth.$inject = ['$rootScope', '$state', '$q', '$firebase', '$firebaseAuth', 'FireFactory', 'User'];
    function Auth($rootScope, $state, $q, $firebase, $firebaseAuth, FireFactory, User){
        var ref = FireFactory.firebaseRef('');
        var auth = $firebaseAuth(ref);
        var authData = auth.$getAuth();
        var currentUser = undefined;

        return {
            getCurrentUser: getCurrentUser,
            getCurrentUserAsync: getCurrentUserAsync,
            login: login,
            logout: logout,
            signup: signup,
            isLoggedInAsync: isLoggedInAsync
        };

        function getCurrentUser(){
            return currentUser;
        }

        function getCurrentUserAsync(){
            if(!currentUser){
                if(authData){
                    var deferred = $q.defer();
                    User.get(authData.uid).then(function(user){
                        currentUser = user;
                        deferred.resolve(user);
                    });
                    return deferred.promise;
                }else{
                    return currentUser;
                }
            }else{
                return currentUser;
            }
        }

        function login(user, successCallback, failCallback){
            auth.$authWithPassword(user, {
                remember: 'sessionOnly'
            })
                .then(function(user){
                    authData = user;
                    var uid = user.uid.replace('simplelogin:', '').replace('facebook:', '');
                    var loggedInUser = $firebase(FireFactory.firebaseRef('user/' + uid)).$asObject();
                    loggedInUser.$loaded(function(data){
                        if(data.$value === null){
                            loggedInUser = $firebase(FireFactory.firebaseRef('admin/' + uid)).$asObject();
                            loggedInUser.$loaded(function(data){
                                if(data.$value === null){
                                    throw {
                                        error: 1,
                                        message: 'No user data'
                                    }
                                }else{
                                    currentUser = data;
                                    successCallback(loggedInUser, true);
                                }
                            });
                        }else{
                            currentUser = data;
                            successCallback(loggedInUser, false);
                        }
                    });
                }, function(err){
                    failCallback(err);
                });
        }

        function logout(){
            auth.$unauth();
            currentUser = {};
            authData = undefined;
            $state.go('login');
        }

        function signup(user, successCallback, failCallback){

            auth.$createUser(user)
                .then(function(newUser){
                    console.log('User data signed up successfully', newUser);

                    console.log('Time to create user data in user node');

                    delete user.password;
                    user.level = 'user';
                    var uid = newUser.uid.replace('simplelogin:', '').replace('facebook:', '');
                    var userSync = $firebase(FireFactory.firebaseRef('user/' + uid)).$asObject();
                    angular.extend(userSync, user);
                    userSync.$save().then(function(snapshot){
                        console.log(snapshot);
                        successCallback(snapshot);
                    })
                    console.log(userSync);

                }, function(err){
                    console.log(err);
                    failCallback(err);
                });
        }

        function isLoggedInAsync(callback){
            //console.log('authData', authData);
            if(authData){

                //console.log('currentUser', currentUser);
                if(!currentUser){
                    //console.log('get user detail');
                    User.get(authData.uid).then(function(user){
                        //console.log(user);
                        currentUser = user;
                        callback(true);
                    });
                }else{
                    //console.log('user detail has been loaded already');
                    callback(true);
                }
            }else{
                callback(false);
            }
        }
    }
})();