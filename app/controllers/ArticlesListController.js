angular.module('newsApp').controller("ArticlesListController", function($scope, ArticleService) {
    init();

    $scope.addArticle = function(article) {
        ArticleService.addArticle(article);

        $scope.article = {
            title: '',
            discription: '',
        };
    };

    function init() {
        $scope.article = {
            title: '',
            discription: ''
        };

        return ArticleService.getArticlesList()
            .then(function(response) {
                $scope.articles = response;
            });
    }
});