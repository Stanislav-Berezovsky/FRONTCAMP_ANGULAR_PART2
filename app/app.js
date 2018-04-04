var newsApp = angular.module('newsApp', ["ngRoute","ngResource"]);

newsApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<articles-list></articles-list>'
    });
    $routeProvider.when('/add', {
        template: '<article article="article" action-article="addArticle(article)"></article>',
        controller: 'ArticleController'
    });
    $routeProvider.when('/edit/:articleId', {
            template: '<article article="article" action-article="editArticle(article)"></article>',
            controller: 'ArticleController'
        })
        .otherwise({ template: '<h1>404 - not found such page</h1>' });
});
