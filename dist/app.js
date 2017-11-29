angular.module('movieApp',['ui.router','ngResource','movieApp.controllers','movieApp.services']);

angular.module('movieApp').config(function($stateProvider,$httpProvider){
    $stateProvider.state('movies',{
        url:'/movies',
        templateUrl:'app/partials/movies.html',
        controller:'MovieListController'
    }).state('viewMovie',{
       url:'/movies/:id/view',
       templateUrl:'app/partials/movie-view.html',
       controller:'MovieViewController'
    }).state('newMovie',{
        url:'/movies/new',
        templateUrl:'app/partials/movie-add.html',
        controller:'MovieCreateController'
    }).state('editMovie',{
        url:'/movies/:id/edit',
        templateUrl:'app/partials/movie-edit.html',
        controller:'MovieEditController'
    });
}).run(function($state){
   $state.go('movies');
});;angular.module('movieApp.controllers',[]).controller('MovieListController',function($scope,$state,popupService,$window,Movie){

    $scope.movies=Movie.query();

    $scope.deleteMovie=function(movie){
        if(popupService.showPopup('Really delete this?')){
            movie.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('MovieViewController',function($scope,$stateParams,Movie){

    $scope.movie=Movie.get({id:$stateParams.id});

}).controller('MovieCreateController',function($scope,$state,$stateParams,Movie){

    $scope.movie=new Movie();

    $scope.addMovie=function(){
        $scope.movie.$save(function(){
            $state.go('movies');
        });
    }

}).controller('MovieEditController',function($scope,$state,$stateParams,Movie){

    $scope.updateMovie=function(){
        $scope.movie.$update(function(){
            $state.go('movies');
        });
    };

    $scope.loadMovie=function(){
        $scope.movie=Movie.get({id:$stateParams.id});
    };

    $scope.loadMovie();
});;;;angular.module('movieApp.services',[]).factory('Movie',function($resource){
    return $resource('http://localhost:9000/api/users/:id',{id:'@id'},{
        update: {
            method: 'POST'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});;angular.module('templates-dist', ['../app/partials/_form.html', '../app/partials/movie-add.html', '../app/partials/movie-edit.html', '../app/partials/movie-view.html', '../app/partials/movies.html']);

angular.module("../app/partials/_form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/_form.html",
    "<div class=\"form-group\">\n" +
    "    <label for=\"title\" class=\"col-sm-2 control-label\">Title</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "        <input type=\"text\" ng-model=\"movie.firstName\" class=\"form-control\" id=\"title\" placeholder=\"Movie Title Here\"/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label for=\"year\" class=\"col-sm-2 control-label\">Release Year</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "        <input type=\"text\" ng-model=\"movie.lastName\" class=\"form-control\" id=\"year\" placeholder=\"When was the movie released?\"/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label for=\"director\" class=\"col-sm-2 control-label\">Director</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "        <input type=\"text\" ng-model=\"movie.username\" class=\"form-control\" id=\"director\" placeholder=\"Who directed the movie?\"/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label for=\"plot\" class=\"col-sm-2 control-label\">Movie Genre</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "        <input type=\"text\" ng-model=\"movie.created\" class=\"form-control\" id=\"plot\" placeholder=\"Movie genre here\"/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../app/partials/movie-add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/movie-add.html",
    "<form class=\"form-horizontal\" role=\"form\" ng-submit=\"addMovie()\">\n" +
    "    <div ng-include=\"'app/partials/_form.html'\"></div>\n" +
    "</form>");
}]);

angular.module("../app/partials/movie-edit.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/movie-edit.html",
    "<form class=\"form-horizontal\" role=\"form\" ng-submit=\"updateMovie()\">\n" +
    "    <div ng-include=\"'app/partials/_form.html'\"></div>\n" +
    "</form>");
}]);

angular.module("../app/partials/movie-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/movie-view.html",
    "<table class=\"table movietable\">\n" +
    "    <tr>\n" +
    "        <td><h3>Details for {{movie.title}}</h3></td>\n" +
    "        <td></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Movie Title</td>\n" +
    "        <td>{{movie.firstName}}</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Director</td>\n" +
    "        <td>{{movie.lastName}}</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Release Year</td>\n" +
    "        <td>{{movie.username}}</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Movie Genre</td>\n" +
    "        <td>{{movie.created}}</td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "<div>\n" +
    "    <a class=\"btn btn-primary\" ui-sref=\"editMovie({id:movie.id})\">Edit</a>\n" +
    "</div>");
}]);

angular.module("../app/partials/movies.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/movies.html",
    "<a ui-sref=\"newMovie\" class=\"btn-primary btn-lg nodecoration\">Add New Movie</a>\n" +
    "\n" +
    "<table class=\"table movietable\">\n" +
    "    <tr>\n" +
    "        <td><h3>All Movies</h3></td>\n" +
    "        <td></td>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"movie in movies\">\n" +
    "        <td>{{movie.firstName}}</td>\n" +
    "        <td>\n" +
    "            <a class=\"btn btn-primary\" ui-sref=\"viewMovie({id:movie.id})\">View</a>\n" +
    "            <a class=\"btn btn-danger\"  ng-click=\"deleteMovie(movie)\">Delete</a>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>");
}]);
