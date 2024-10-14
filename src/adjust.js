import { Adjust, AdjustConfig, AdjustEvent } from "react-native-adjust";

const AdjustAnalytics = {
    init: (config) => {
        const adjustConfig = new AdjustConfig(config.appToken, config.env === "development" ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction);
        if (config.log) {
            adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
            adjustConfig.setEventTrackingSucceededCallback(function(eventSuccess) {
                console.log("Event tracking succeeded callback received");
                console.log("Message: " + eventSuccess.message);
                console.log("Timestamp: " + eventSuccess.timestamp);
                console.log("Adid: " + eventSuccess.adid);
                console.log("Event token: " + eventSuccess.eventToken);
                console.log("Callback Id: " + eventSuccess.callbackId);
                console.log("JSON response: " + eventSuccess.jsonResponse);
            });

            adjustConfig.setEventTrackingFailedCallback(function(eventFailed) {
                console.log("Event tracking failed callback received");
                console.log("Message: " + eventFailed.message);
                console.log("Timestamp: " + eventFailed.timestamp);
                console.log("Adid: " + eventFailed.adid);
                console.log("Event token: " + eventFailed.eventToken);
                console.log("Callback Id: " + eventFailed.callbackId);
                console.log("Will retry: " + eventFailed.willRetry);
                console.log("JSON response: " + eventFailed.jsonResponse);
            });
            Adjust.initSdk(adjustConfig);
        }
    },

    logEvent: (eventToken) => {
        let adjustEvent = new AdjustEvent(eventToken);
        Adjust.trackEvent(adjustEvent);
    },

    remove: () => {
        Adjust.componentWillUnmount();
    }
}

export default AdjustAnalytics;