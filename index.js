
class Analytics {
    constructor(config) {
        this.config = config;
        this.enabledSDK = {};
    }

    async initialize() {
        console.log("enable sdk");
        console.log(this.enabledSDK);
        console.log(this.config);
        for (const sdkName in this.config) {
            const sdkConfig = this.config[sdkName];

            if (sdkConfig?.enabled) {
                try {
                    let sdkModule;
                    switch (sdkName) {
                        case 'firebase':
                            sdkModule = await import('./src/firebase');
                            break;
                        case 'facebook':
                            sdkModule = await import('./src/facebook');
                            break;
                        case 'branch':
                            sdkModule = await import('./src/branch');
                            break;
                        case 'appsFlyer':
                            sdkModule = await import('./src/appsFlyer');
                            break;
                        case 'adjust':
                            sdkModule = await import('./src/adjust');
                            break;
                        default:
                            throw new Error(`Unknown SDK: ${sdkName}`);
                    }
                    const sdk = sdkModule.default || sdkModule;
                    sdk.init(sdkConfig);
                    this.enabledSDK[sdkName] = sdk;
                    console.log(`${sdkName} SDK initialized`);
                } catch (error) {
                    console.error(`Failed to initialize ${sdkName}:`, error);
                }
            }
        }
    }

    logEvent(eventName, params = {}) {
        console.log("try log event");
        console.log(this.enabledSDK);
        for (const sdkName in this.enabledSDK) {
            const sdk = this.enabledSDK[sdkName];
            console.log(`Logging event for ${sdkName}:`, eventName, params);
            sdk.logEvent(eventName, params);
        }
    }

    async logPurchase(amount, currency, params) {
        if (this.enabledSDK?.facebook?.enabled) {
            let facebookModule;
            try {
                facebookModule = await import('./src/facebook');
            } catch (e) {
                console.error(`Failed to import facebook module:`, e);
            }

            const facebook = facebookModule.default || facebookModule;
            facebook.logPurchase(amount, currency, params);
        }
    }
}


export default Analytics;

