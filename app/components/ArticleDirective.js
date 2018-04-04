angular.module('newsApp').directive('article', ['$parse', function () {
    return {
        restrict: "E",
        templateUrl: "../templates/articleTemplate.html",
        scope: {
            article: '=',
            actionArticle: '&'
        },
        link: function (scope, element, attrs) {
        },
    };
}]);