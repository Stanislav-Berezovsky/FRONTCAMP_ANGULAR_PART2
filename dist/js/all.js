var newsApp = angular.module('newsApp', ["ngRoute","ngResource"]);

angular.module('newsApp').component('articlesList', {
    bindings: {
        articles: '=',
        templateUrl: "../templates/articlesListTemplate.html"
    }
});
angular.module('newsApp').controller("ArticlesListController", function(ArticleService) {
	var _this = this;

	init();

    function init() {
    	return ArticleService.getArticlesList()
    		.then(function(response){
    			this.articles = response;
    		});
    }
});
angular.module('newsApp').service('ArticleService', function($q, ArticlesListFactory) {
    var articleList = [];

    function getArticlesList() {
        return (articleList.length > 0) ? $q.resolve(articleList) :
            ArticlesListFactory.query().$promise.then(function(response) {
                response.forEach(function(article) {
                    return articleList.push(angular.copy(article));
                });

                return articleList;
            });
    }

    function addArticle(description) {
        var now = new Date(),
            newItem = {
                itemId: lastItemIndex++,
                description: description,
                date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                isDone: false
            };

        filteredLists.processItemsList.push(newItem);
    }

    function editArticle(item) {
        (item.isDone ? filteredLists.doneItemsList : filteredLists.processItemsList)[item.index].description = item.text;
    }

    return {
        getArticlesList: getArticlesList,
        addArticle: addArticle,
        editArticle: editArticle
    };
});
angular.module('newsApp').factory('ArticlesListFactory', function($resource) {
    return $resource('/serverResponse/:fileId.:format', {
        fileId: 'articles',
        format: 'json'
    });
});