angular.module('newsApp').component('articlesList', {
    bindings: {
        articles: '=',
        templateUrl: "../templates/articlesListTemplate.html"
    }
});