angular.module('newsApp').controller("ArticleController", function($scope, $location, ArticleService, $routeParams) {
    init();

    $scope.addArticle = function(article) {
        ArticleService.addArticle(article);

        $location.path('/');
    };

    $scope.editArticle = function(article) {
        ArticleService.editArticle(article);

        $location.path('/');
    };

    function init() {
        if ($routeParams.articleId) {
            var articleId = Number($routeParams.articleId),
                articles = ArticleService.getAllArticles();

            articleIndex = articles.map(function(article) {
                return article.articleId;
            }).indexOf(articleId);

            if (articleIndex !== -1) {
                $scope.article = angular.copy(articles[articleIndex]);
                return;
            }
        }

        $scope.article = {
            articleId: -1,
            title: '',
            description: '',
        };
    }
});