# rg-react-native-in-app-updates
Simple Package In App Updates For React Native supports on both Android and IOS.

# Getting started
rg-react-native-in-app-updates is a package/module created to support your app to update itself. whereas on ios devices the app only shows a prompt to update the app.# Files

# Installation

    npm i rg-react-native-in-app-updates

**For IOS Only :** 
On  **iOS**  you may need to also add the following lines in your Info.plist to be able to launch the store deep link.

    <key>LSApplicationQueriesSchemes</key>
    <array>
      <string>itms-apps</string>
    </array>

### Troubleshooting
 if error appear :

    Error: @react-native-community/react-native-device-info: NativeModule.RNDeviceInfo is null.

 You can install manually package **react-native-device-info** if you don't define a bundle Identifier and local version of the application. to install it run the following command.

Using npm:

    npm install --save react-native-device-info

or using yarn:

    yarn add react-native-device-info

then

    cd ios && pod install && cd ..

## Options IOS Only

|value|type|description|
|--|--|--|
|localVersion (**IOS Only**)| String (Required if not uses **react-native-device-info**) | version currently running on the device|
|bundleIdentifier (**IOS Only**)|String (Required if not uses **react-native-device-info**)(**IOS Only**) | bundle identifier on Xcode |
|title **IOS Only**)|String(Optional) | The title of the alert prompt when there's a new version. (default: `Update Available`) |
|forceUpgrade| boolean (optional) | If set to true the user won't be able to cancel the upgrade (default:  `false`)|
|message|String(Optional)|The content of the alert prompt when there's a new version (default:  `There is an updated version available on the App Store. Would you like to update?`)|
|buttonUpdateText| String(Optional) |The text of the confirmation button on the alert prompt (default:  `Update` )|
|buttonCancelText| String(Optional) | The text of the cancelation button on the alert prompt (default:  `Cancel`)|
