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