"use strict";

//---------------------------------------------account controller-----------------------------//
newl.controller("accountController" , function($scope, $state, $firebaseAuth, $firebaseObject , $timeout,$ionicLoading){
    
     var fbAuth = $firebaseAuth(fb);
     var obj = $firebaseObject(fb);

     

     //check if user authinticate or not
    fbAuth.$onAuth(function(authData) {
        if (authData) {
          console.log("Logged in as:", authData.uid);
          //$state.go("tabs.list");
        } else {
          console.log("Logged out");
          $state.go("account");
        }
     });



     $scope.login =function (username , password) {
     
      $scope.show($ionicLoading);
      fbAuth.$authWithPassword({
        email: username,
        password: password
      }).then(function(authData){
        $state.go("tabs.list");
      }).catch(function(error){
        console.error("ERROR:" + error);
        $scope.error = "ERROR:" + error;
      });
     };

     $scope.register =function (username , password) {
      $scope.show($ionicLoading);
      fbAuth.$createUser({email: username,password: password}).then(function(userData){
        return fbAuth.$authWithPassword({
          email: username,
          password: password
        });
      }).then(function(authData){
        $state.go("tabs.list");
      }).catch(function(error){
        console.error("ERROR:" + error);
      });
     };


  

    //----------------ionic loader --------------------------------
    $scope.show = function() {
        $ionicLoading.show({
          animation: 'fade-in',
          maxWidth: 200,
          showDelay: 0,
          template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
        });
    };

    
    $scope.hide = function(){
        $ionicLoading.hide();
    };        



});
