declare module 'react-native-analytics-tools' {
	export interface AnalyticsConfig {
		firebase?: FirebaseConfig;
		facebook?: FacebookConfig;
		branch?: BranchConfig;
	}

	export interface FirebaseConfig {
		enabled: boolean;
		// Add other Firebase configuration options here if needed
	}

	export interface FacebookConfig {
		enabled: boolean;
		appID: string,
		// Add other Facebook configuration options here if needed
	}

	export interface BranchConfig {
		enabled: boolean;
		// Add other Branch configuration options here if needed
	}

	export interface Analytics {
		initialize(config: AnalyticsConfig): void;
		logEvent(eventName: string, params?: Record<string, any>): void;
		logPurchase(amount: string, currency: string, params?: Record<string, any>): void;
		setUserId(userId: string): void;
		setUserProperty(property: string, value: string): void;
	}

	const analytics: Analytics;
	export default analytics;
}
