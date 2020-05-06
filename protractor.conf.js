// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
const tsConfig = require("./e2e/tsconfig.e2e.json");

exports.config = {
    SELENIUM_PROMISE_MANAGER: false,

    allScriptsTimeout: 30000,
    specs: [
        './e2e/src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--window-size=1440,900']
        }
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));

        require('ts-node').register({
            project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
        });

        require('tsconfig-paths').register({
            project: require('path').join(__dirname, './e2e/tsconfig.e2e.json'),
            baseUrl: 'e2e/',
            paths: tsConfig.compilerOptions.paths
        });
    }
};
