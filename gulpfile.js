var gulp = require('gulp');
var reporter = require('cucumber-html-reporter');
var options = {
    theme: 'bootstrap',
    jsonFile: './reports/cucumber-json-report.json',
    output: './reports/cucumber-html-report.html',
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version":"1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome  76.0",
        "Platform": "Mac 11",
        "Parallel": "Scenarios",
        "Executed": "Local"
    }
};

gulp.task('cucumberReports',function () {
    reporter.generate(options);
})
