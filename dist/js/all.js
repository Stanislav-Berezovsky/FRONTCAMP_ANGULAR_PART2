var newsApp = angular.module('newsApp', ["ngRoute","ngResource"]);

newsApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        template: '<articles-list articles="articles"></articles-list>',
        controller: 'ArticlesListController'
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

    function editArticle(article) {
        articleList[article.articleId] = article;
    }

    function getAllArticles(){
        return articleList;
    }

    return {
        getArticlesList: getArticlesList,
        addArticle: addArticle,
        editArticle: editArticle,
        getAllArticles: getAllArticles
    };
});
angular.module('newsApp').factory('ArticlesListFactory', function($resource) {
    return $resource('/serverResponse/:fileId.:format', {
        fileId: 'articles',
        format: 'json'
    });
});
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