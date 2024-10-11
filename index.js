import firebaseAnalytics from './src/firebase';
import facebookAnalytics from './src/facebook';
import branchAnalytics from './src/branch';
import AppsFlyerAnalytics from "./src/appsFlyer";

const initialize = (config) => {
    firebaseAnalytics.initialize(config.firebase);
    facebookAnalytics.initialize(config.facebook);
    branchAnalytics.initBranch(config.branch);
    if (config.appsFlyer && config.appsFlyer.enabled) {
        AppsFlyerAnalytics.init(config.appsFlyer);
    }
};

const logEvent = async (eventName, params) => {
    await firebaseAnalytics.logEvent(eventName, params);
    facebookAnalytics.logEvent(eventName, params);
    AppsFlyerAnalytics.logEvent(eventName, params);
};

const logPurchase = async (amount, currency, params) => {
    facebookAnalytics.logPurchase(amount, currency, params);
};

export default {initialize, logEvent, logPurchase};

