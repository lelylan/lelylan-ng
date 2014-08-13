// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/oauth-ng/dist/oauth-ng.js',
      'app/bower_components/ngstorage/ngstorage.js',
      'app/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'app/bower_components/base64/base64.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/spec/services/**/*.js',
      'test/spec/config/**/*.js',
      { pattern: 'test/spec/fixtures/*.json', watched: true, served: true, included: false }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    // Karma plugins for preprocessors, reporters, browser launchers and frameworks
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],

    // Preprocessor for converting HTML files to AngularJS templates
    preprocessors: {
      'app/views/**/*.html': ['html2js'],
      'app/scripts/**/*.js': ['coverage']
    },

    // add coverage to reporters
    reporters: ['progress', 'coverage'],

    // tell karma how you want the coverage results
    coverageReporter: {
      reporters:[
        { type: 'html', dir:'coverage/' },
        //{type: 'text-summary'}
      ],
    },

    // set the path to use to search the template and set the templates module to
    // load all templates at once
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },
  });
};
