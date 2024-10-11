import appsFlyer from 'react-native-appsflyer';


let appsFlyerConfig = null;


const AppsFlyerAnalytics = {
    init: (config) => {
        appsFlyerConfig = config
        appsFlyer.initSdk(config,
            (result) => {
                console.log('AppsFlyer SDK initialized successfully:', result);
            },
            (error) => {
                console.error('AppsFlyer SDK initialization failed:', error);
            }
        );
    },

    logEvent: (eventName, eventValues) => {
        if (appsFlyerConfig && appsFlyerConfig.enabled) {
            appsFlyer.logEvent(eventName, eventValues, (result) => {
                console.log(`AppsFlyer event ${eventName} logged:`, result);
            }, (error) => {
                console.error(`AppsFlyer event ${eventName} log failed:`, error);
            });
        }
    },
};

export default AppsFlyerAnalytics;
