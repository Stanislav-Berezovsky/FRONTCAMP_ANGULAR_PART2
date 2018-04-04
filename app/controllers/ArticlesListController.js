angular.module('newsApp').controller("ArticlesListController", function ($scope, $location,ArticleService) {
    init();

    $scope.editArticle = function(id){
    	$location.path('/edit/'+ articleId);
    };
  
    function init() {
        return ArticleService.getArticlesList()
            .then(function (response) {
                $scope.articles = response;
            });
    }
});