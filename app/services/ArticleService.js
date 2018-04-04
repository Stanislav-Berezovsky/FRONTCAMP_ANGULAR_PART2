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