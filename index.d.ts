declare module 'react-native-analytics-tools' {

	export type BuildMode = "production" | "development";

	export interface AnalyticsConfig {
		firebase?: FirebaseConfig;
		facebook?: FacebookConfig;
		branch?: BranchConfig;
		adjust?: AdjustConfig;
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

	export interface AdjustConfig {
		enabled: boolean;
		appToken: string;
		env?: BuildMode;
		log?: boolean;
	}

	export class Analytics {
		constructor(config: AnalyticsConfig);

		public initialize(): void;
		public logEvent(eventName: string, params?: Record<string, any>): void;
		public setUserId(userId: string): void;
		public setUserProperty(property: string, value: string): void;
		public logPurchase(amount: string, currency: string, params?: Record<string, any>): void;

		private enabledSDK: { [key: string]: boolean };
		private config: AnalyticsConfig;
		private sdkMap: { [key: string]: any };
	}
}
