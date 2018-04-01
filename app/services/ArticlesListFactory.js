angular.module('newsApp').factory('ArticlesListFactory', function($resource) {
    return $resource('/serverResponse/:fileId.:format', {
        fileId: 'articles',
        format: 'json'
    });
});