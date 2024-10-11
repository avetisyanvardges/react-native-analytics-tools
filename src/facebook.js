import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';

let facebookConfig = null;

const initialize = (config) => {
    facebookConfig = config;
    Settings.initializeSDK()
    Settings.setAppID(config.appID);
};

const logEvent = (eventName, params) => {
    if (facebookConfig && facebookConfig.enabled) {
        AppEventsLogger.logEvent(eventName, params);
    }
};


const logPurchase = (amount, currency, params) => {
    if (facebookConfig && facebookConfig.enabled) {
        AppEventsLogger.logPurchase(amount, currency, params);
    }
};

export default {
    initialize,
    logEvent,
    logPurchase
};
