// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('Page1Ctrl', function($scope, $state) {
  $scope.debugLog = 'app started';
  $scope.myTitle = 'Y&amp;L';
  $scope.beaconFound = false;


  $scope.logToDom = function (message) {
    $scope.debugLog += '\n' + message;
  };
  $scope.logToDom('app started');
  document.addEventListener("deviceready", function() {
  var delegate = new cordova.plugins.locationManager.Delegate();

  // delegate.didDetermineStateForRegion = function (pluginResult) {

  //     logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

  //     cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
  //         + JSON.stringify(pluginResult));
  // };

  // delegate.didStartMonitoringForRegion = function (pluginResult) {
  //     console.log('didStartMonitoringForRegion:', pluginResult);

  //     logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
  // };

  delegate.didRangeBeaconsInRegion = function (pluginResult) {

      if (!$scope.beaconFound && pluginResult.beacons.length > 0 && pluginResult.region.identifier == 'green') {
        $scope.beaconFound = true;
        $state.go('page2');

      }
      else if (!$scope.beaconFound && pluginResult.beacons.length > 0 && pluginResult.region.identifier == 'blue'){
        $scope.beaconFound = true;
        $state.go('page3');
      }
  };

  var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
  var beaconRegionGreen = new cordova.plugins.locationManager.BeaconRegion('green', uuid, 25139, 37415);
  var beaconRegionBlue = new cordova.plugins.locationManager.BeaconRegion('blue', uuid, 6098, 38954);
  cordova.plugins.locationManager.setDelegate(delegate);

  // required in iOS 8+
  // cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
  cordova.plugins.locationManager.requestAlwaysAuthorization();

  cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegionGreen)
      .fail(function(e) { console.error(e); })
      .done();

  cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegionBlue)
    .fail(function(e) { console.error(e); })
    .done()


  });
})

.controller('Page2Ctrl', function($scope) {

})

.controller('Page3Ctrl', function($scope) {

})

.controller('Page4Ctrl', function($scope) {

})

.controller('Page5Ctrl', function($scope) {

})

.controller('Page6Ctrl', function($scope) {

})

.controller('Page7Ctrl', function($scope) {

})

.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider
   .state('page1', {
     url: "/page1",
     templateUrl: "templates/page1.html",
     controller: 'Page1Ctrl'
   })
   .state('page2', {
      url: "/page2",
      templateUrl: "templates/page2.html",
      controller: 'Page2Ctrl'
   })
   .state('page3', {
      url: "/page3",
      templateUrl: "templates/page3.html",
      controller: 'Page3Ctrl'
   })
   .state('page4', {
    url: "/page4",
    templateUrl: "templates/page4.html",
    controller: 'Page4Ctrl'
   })
   .state('page5', {
    url: "/page5",
    templateUrl: "templates/page5.html",
    controller: 'Page5Ctrl'
   })
   .state('page6', {
    url: "/page6",
    templateUrl: "templates/page6.html",
    controller: 'Page6Ctrl'
   })
   .state('page7', {
    url: "/page7",
    templateUrl: "templates/page7.html",
    controller: 'Page7Ctrl'
   });


 // If none of the above states are matched, use this as the fallback:
 $urlRouterProvider.otherwise('page1');
})