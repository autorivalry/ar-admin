(function() {
  'use strict';

  angular
    .module('arAdmin')
    .factory('Matchups', Matchups);

  /** @ngInject */
  function Matchups (FIREBASE_URL, $firebaseArray, $firebaseObject, Auth) {
    var itemsRef = new Firebase(FIREBASE_URL + "/matchups");

    // return a $firebaseArray of all the matchups
    // that have a uid **key** that matches our logged in user
    var Matchups = $firebaseArray.$extend({
      getMyMatchups: function () {
        var query = itemsRef.orderByChild('uid').equalTo(Auth.$getAuth().uid);
        return $firebaseArray(query);
      }
    });

    return {
      $array: Matchups(itemsRef),
      $object: function (objectId) {
        return $firebaseObject(itemsRef.child(objectId));
      }
    }
  }

})();
