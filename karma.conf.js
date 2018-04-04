module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'node_modules/angular/angular.js',
            'dist/js/all.js',
            'node_modules/chai-shallow-deep-equal/chai-shallow-deep-equal.js',
            './tests/**/*Spec.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
