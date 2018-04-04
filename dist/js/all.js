var newsApp = angular.module('newsApp', ["ngRoute","ngResource"]);

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
angular.module('newsApp').component('articlesList', {
    templateUrl: "../templates/articlesListTemplate.html",
    bindings: {
        articles: '='
    }
});
angular.module('newsApp').service('ArticleService', function($q, ArticlesListFactory) {
    var articleList = [];

    function getArticlesList() {
        return (articleList.length > 0) ? $q.resolve(articleList) :
            ArticlesListFactory.query().$promise.then(function(response) {
                response.forEach(function(article) {
                    article.publishedAt = new Date(article.publishedAt);
                    return articleList.push(angular.copy(article));
                });

                return articleList;
            });
    }

    function addArticle(article) {
        var now = new Date();
           
        article.articleId = articleList.length ;
        article.publishedAt = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        articleList.push(article);
    }

    function editArticle(item) {
        (item.isDone ? filteredLists.doneItemsList : filteredLists.processItemsList)[item.index].description = item.text;
    }

    function getAllArticles(){
        return articleList;
    }

    return {
        getArticlesList: getArticlesList,
        addArticle: addArticle,
        editArticle: editArticle,
        articleList: articleList
    };
});
angular.module('newsApp').factory('ArticlesListFactory', function($resource) {
    return $resource('/serverResponse/:fileId.:format', {
        fileId: 'articles',
        format: 'json'
    });
});
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