angular.module('newsApp').controller("ArticleController", function(ArticleService) {
	var _this = this;

	init();

    function init() {
    	return ArticleService.getArticlesList()
    		.then(function(response){
    			_this.articles = response;
    		});
    }
});