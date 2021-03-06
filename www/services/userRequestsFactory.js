(function(){

// Requests to server sending and retrieving data for specific users
var UserRequests = function ($http){
  var userData;

  return {
    allData: userData,
    userProfileData: null,

    // Sends request to server with relevant user data 
    // for creation of new user or retrieval of existing user' checkins/data
    sendUserData: function (data) {
      if(data) {
        return $http({
          method: 'POST',
          data: data,
          url: '/api/users/userdata'
        });
      }
    },

    getUserInfo: function (userFbID) {
      if (userFbID) {
        return $http({
          method: 'GET',
          url: '/api/users/userinfo/' + userFbID
        });
      }

    },
    
    // Grab existing user's checkins/data
    // Pass in the viewerID so that there is a context to the data returned
    // this allows the viewer to see whether they have liked another user's checkin

    getUserData: function (userFbID, viewerID) {
      var url = '/api/users/' + userFbID + "/" + viewerID;
      
      if (arguments[2] !== undefined) {
          var page = arguments[2]
          url +=  "/" + page;
      }

      if (arguments[3] !== undefined) {
          var skip = arguments[3]
          url +=  "/" + skip;
      }

      if (userFbID) {
        return $http({
          method: 'GET',
          url: url
        });
      }
    },

    getAggregatedFeedData:function (userFbID) {
      var url = '/api/users/aggregatefeed/' + userFbID;
      
      if (arguments[1] !== undefined) {
          var page = arguments[1];
          url +=  "/" + page;
      }

      if (arguments[2] !== undefined) {
          var skip = arguments[2];
          url +=  "/" + skip;
      }
      console.log(url);

      if (userFbID) {
        return $http({
          method: 'GET',
          url: url
        });
      }
    },

    getBucketList: function (userFbID) {
      var url = '/api/users/bucketlist/' + userFbID;
      if (arguments[1] !== undefined) {
          var page = arguments[1]
          url +=  "/" + page;
          console.log(url);
      }

      if (arguments[2] !== undefined) {
          var skip = arguments[2]
          url +=  "/" + skip;
      }

      if (userFbID) {
        return $http({
          method: 'GET',
          url: url
        });
      }
    },

    addFolder: function(userFbID, folderName, folderDescription) {
      var url = '/api/users/folders';
      if (userFbID) {
        return $http({
          method: 'POST',
          url: url,
          data: {
            facebookID: userFbID,
            folderName: folderName,
            folderDescription: folderDescription
          }
        });
      }
    },

    fetchFolders: function(userFbID) {
      var url = '/api/users/folders/' + userFbID;

      if (arguments[1] !== undefined) {
          var page = arguments[1]
          url +=  "/" + page;
          console.log(url);
      }

      if (arguments[2] !== undefined) {
          var skip = arguments[2]
          url +=  "/" + skip;
      }

      return $http({
        method: 'GET',
        url: url
      });
    },

    searchFoldersByName: function(userFbID, query) {
      var url = '/api/users/folders/search/' + userFbID + '/' + query;

      if (arguments[1] !== undefined) {
          var page = arguments[1]
          url +=  "/" + page;
          console.log(url);
      }

      if (arguments[2] !== undefined) {
          var skip = arguments[2]
          url +=  "/" + skip;
      }

      return $http({
        method: 'GET',
        url: url
      });
    },
    
    searchUserFootprints: function (userFbID, query) {
      if (userFbID && query) {
        return $http({
          method: 'GET',
          url: '/api/users/searchfootprints/' + userFbID + '/' + query
        });
      }
    },

    searchFeed: function (userFbID, query) {
      var url = '/api/users/searchfeed/' + userFbID + '/' + query
      if (arguments[2] !== undefined) {
          var page = arguments[2]
          url +=  "/" + page;
          console.log(url);
      }

      if (arguments[3] !== undefined) {
          var skip = arguments[3]
          url +=  "/" + skip;
      }
      if (userFbID && query) {
        return $http({
          method: 'GET',
          url: url
        })
      }
    },

    getFriendsList: function (userFbID) {
      var url = '/api/users/friendslist/' + userFbID      

      if (arguments[1] !== undefined) {
          var page = arguments[1];
          url +=  "/" + page;
          console.log(url);
      }

      if (arguments[2] !== undefined) {
          var skip = arguments[2];
          url +=  "/" + skip;
      }
      console.log(url);

      if (userFbID) {
        return $http({
          method: 'GET',
          url: url
        });
      }
    }
  };

};

UserRequests.$inject = ['$http'];

//Start creating Angular module
angular.module('waddle.services.userRequests', [])  
  .factory('UserRequests', UserRequests);

})();