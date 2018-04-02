angular.module('newsApp').component('articlesList', {
    templateUrl: "../templates/articlesListTemplate.html",
    bindings: {
        articles: '='
    }
});