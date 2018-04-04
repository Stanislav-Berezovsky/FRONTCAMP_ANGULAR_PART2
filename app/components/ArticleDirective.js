angular.module('newsApp').directive('article', function() {
    return {
        restrict: "E",
        templateUrl: "../templates/articleTemplate.html",
        scope: {
            article: '=',
            addArticle: '&'
        },
        link: function(scope, el, attr) {}
    };
});