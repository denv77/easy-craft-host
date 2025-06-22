const {withNativeFederation, shareAll} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

    shared: {
        ...shareAll({singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: false}),
    },
    skip: [
        'rxjs/ajax',
        'rxjs/fetch',
        'rxjs/testing',
        'rxjs/webSocket',
        /^@angular\/common\/locales(\/|$)/
    ]

});
