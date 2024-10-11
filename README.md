
# React Native Analytics Tools

A universal module for integrating Firebase, Facebook, Branch, and AppsFlyer analytics in React Native apps.

## Installation

### Step 1: Install the Package

Install the module via npm or yarn:

```bash
npm install react-native-analytics-tools
# or
yarn add react-native-analytics-tools
```

### Step 2: Install Required Dependencies

```bash
npm install @react-native-firebase/app @react-native-firebase/analytics
npm install react-native-fbsdk-next
npm install react-native-branch
npm install react-native-appsflyer
npx pod-install
```

## Configuration

### iOS Configuration

1. **Install CocoaPods Dependencies:**

   In the `ios` directory of your React Native project, run:

   ```bash
   npx pod-install
   ```

2. **Add Firebase Configuration:**

   - Download the `GoogleService-Info.plist` from your Firebase project.
   - Place the `GoogleService-Info.plist` file in the `ios` directory of your project.
   - Open your `.xcworkspace` file in Xcode and drag the `GoogleService-Info.plist` into the project navigator.

3. **Add Facebook Configuration:**

   - Configure your app in the [Facebook Developer Console](https://developers.facebook.com/).
   - Open your `Info.plist` file and add the following entries:

     ```xml
     <key>FacebookAppID</key>
     <string>Your_Facebook_App_ID</string>
     <key>FacebookDisplayName</key>
     <string>Your_App_Display_Name</string>
     <key>CFBundleURLTypes</key>
     <array>
       <dict>
         <key>CFBundleURLSchemes</key>
         <array>
           <string>fbYour_Facebook_App_ID</string>
         </array>
       </dict>
     </array>
     ```

   - Implement the following method in your app delegate to handle Facebook URL schemes:

     ```swift
     import FBSDKCoreKit

     @UIApplicationMain
     class AppDelegate: UIResponder, UIApplicationDelegate {
         var window: UIWindow?

         func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
             ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)
             return true
         }

         func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
             return ApplicationDelegate.shared.application(application, open: url, options: options)
         }

         func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
             return ApplicationDelegate.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
         }
     }
     ```

4. **Add Branch Configuration:**

   - Open your `Info.plist` file and add the following entries:

     ```xml
     <key>branch_key</key>
     <string>Your_Branch_Key</string>
     ```

   - Implement the following methods in your app delegate to handle Branch initialization:

     ```swift
     import Branch

     @UIApplicationMain
     class AppDelegate: UIResponder, UIApplicationDelegate {
         var window: UIWindow?

         func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
             let branch = Branch.getInstance()
             branch.initSession(launchOptions: launchOptions, andRegisterDeepLinkHandler: { params, error in
                 if let params = params as? [String: AnyObject], error == nil {
                     print("Branch initialization completed with params: \(params)")
                 }
             })
             return true
         }

         func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
             return Branch.getInstance().application(application, open: url, options: options)
         }

         func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
             return Branch.getInstance().continue(userActivity)
         }
     }
     ```

5. **Add AppsFlyer Configuration:**

   - Add `AppsFlyerFramework` to your `Podfile`:

     ```ruby
     pod 'AppsFlyerFramework'
     ```

   - In `AppDelegate.m`, import the AppsFlyer SDK:

     ```objective-c
     #import <AppsFlyerLib/AppsFlyerLib.h>
     ```

   - Initialize AppsFlyer in the `didFinishLaunchingWithOptions` method:

     ```objective-c
     [[AppsFlyerLib shared] setAppsFlyerDevKey:@"YOUR_DEV_KEY"];
     [[AppsFlyerLib shared] setAppleAppID:@"YOUR_APP_ID"];
     [[AppsFlyerLib shared] start];
     ```

### Android Configuration

1. **Add Firebase Configuration:**

   - Download the `google-services.json` file from your Firebase project.
   - Place the `google-services.json` file in the `android/app` directory.

   - Add the following classpath to your `android/build.gradle` file:

     ```gradle
     dependencies {
         classpath 'com.google.gms:google-services:4.3.3'
     }
     ```

   - Apply the Google services plugin at the bottom of the `android/app/build.gradle` file:

     ```gradle
     apply plugin: 'com.google.gms.google-services'
     ```

2. **Add Facebook Configuration:**

   - Configure your app in the [Facebook Developer Console](https://developers.facebook.com/).
   - Add the following to your `android/app/src/main/res/values/strings.xml` file:

     ```xml
     <string name="facebook_app_id">Your_Facebook_App_ID</string>
     ```

   - Add the following to your `android/app/src/main/AndroidManifest.xml` file:

     ```xml
     <application>
         <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
         <activity android:name="com.facebook.FacebookActivity"
                   android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|smallestScreenSize"
                   android:label="@string/app_name" />
         <activity android:name="com.facebook.CustomTabActivity"
                   android:exported="true">
             <intent-filter>
                 <action android:name="android.intent.action.VIEW" />
                 <category android:name="android.intent.category.DEFAULT" />
                 <category android:name="android.intent.category.BROWSABLE" />
                 <data android:scheme="@string/fb_login_protocol_scheme" />
             </intent-filter>
         </activity>
     </application>
     ```

3. **Add Branch Configuration:**

   - Open your `android/app/src/main/AndroidManifest.xml` file and add the following entries:

     ```xml
     <application>
         <meta-data android:name="io.branch.sdk.BranchKey" android:value="Your_Branch_Key" />
     </application>
     ```

4. **Add AppsFlyer Configuration:**

   - Add AppsFlyer SDK to your `android/build.gradle`:

     ```gradle
     dependencies {
         implementation 'com.appsflyer:af-android-sdk:6.+'
     }
     ```

   - Initialize AppsFlyer in `MainApplication.java`:

     ```java
     import com.appsflyer.AppsFlyerLib;

     AppsFlyerLib.getInstance().init("YOUR_DEV_KEY", null, this);
     AppsFlyerLib.getInstance().start(this);
     ```

## Usage

### Import the Module

```javascript
import analytics from 'react-native-analytics-tools';
```

### Initialize the Module

```javascript
const config = {
  firebase: { enabled: true },
  facebook: { enabled: true },
  branch: { enabled: true },
  appsFlyer: {
    enabled: true,
    devKey: 'YOUR_DEV_KEY',
    appId: 'YOUR_APP_ID',
  },
};

analytics.initialize(config);
```

### Log Events

```javascript
analytics.logEvent('event_name', { param1: 'value1', param2: 'value2' });
```

### Set User ID

```javascript
analytics.setUserId('user123');
```

### Set User Property

```javascript
analytics.setUserProperty('property_name', 'value');
```

## Example

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import analytics from 'react-native-analytics-tools';

const App = () => {
  const handleButtonClick = () => {
    analytics.logEvent('button_click', { button: 'example_button' });
  };

  return (
    <View>
      <Button title="Log Event" onPress={handleButtonClick} />
    </View>
  );
};

export default App;
```

## License

[MIT License](LICENSE)

## .gitignore

```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```
