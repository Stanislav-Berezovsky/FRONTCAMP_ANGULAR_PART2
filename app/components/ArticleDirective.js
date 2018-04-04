angular.module('newsApp').directive('article', function(
	return {
		restrict: "E",
		templateUrl: "../templates/articlesListTemplate.html",
		controller: "ArticleController"
	}
));