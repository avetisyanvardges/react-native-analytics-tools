import analytics from '@react-native-firebase/analytics';

let firebaseConfig = null;

const initialize = (config) => {
    firebaseConfig = config;
    // Initialize Firebase here if needed
};

const logEvent = async (eventName, params) => {
    if (firebaseConfig && firebaseConfig.enabled) {
        await analytics().logEvent(eventName, params);
    }
};

export default {
    initialize,
    logEvent,
};
