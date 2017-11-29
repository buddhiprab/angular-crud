angular.module('movieApp.services',[]).factory('Movie',function($resource){
    return $resource('http://localhost:9000/api/users/:id',{id:'@id'},{
        update: {
            method: 'POST'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});