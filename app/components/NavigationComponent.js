angular.module('newsApp').component('articlesList', {
    templateUrl: "../templates/navigationTemplate.html",
    controller: function($scope, $location) {
    	$scope.navigateToAddArticleView = function(){
    		$location.path('/add/');
    	};

    	$scope.navigateArticleListView = function(){
    		$location.path('/');
    	};
    }
});