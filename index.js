import {Platform, NativeModules } from "react-native";
import performCheck, { promptUser } from "rg-react-native-in-app-updates/iosrdi";
import performCheckn, { promptUsern } from "rg-react-native-in-app-updates/iosnrdi";

const RgInAppUpdates = ({
  title = title || "Update Available",
  message = message ||
    "There is an updated version available on the App Store. Would you like to upgrade?",
  buttonUpgradeText = buttonUpgradeText || "Update",
  buttonCancelText = buttonCancelText || "Cancel",
  forceUpgrade = forceUpgrade,
  localVersion = localVersion,
  bundleIdentifier = bundleIdentifier,
}) => {
  console.log('localVersion',localVersion)
  if (Platform.OS === "ios" && !localVersion && !bundleIdentifier) {
    console.log('masuk ios rdi')
    performCheck().then(
        ({ updateIsAvailable }) => {
          if (updateIsAvailable) {
            promptUser({
              title,
              message,
              buttonUpgradeText,
              buttonCancelText,
              forceUpgrade,
            });
          }
        }
      );
  } else if (Platform.OS === "ios")  {
    console.log('masuk ios nrdi')
    performCheckn({ bundleIdentifier, localVersion }).then(
        ({ updateIsAvailable }) => {
          if (updateIsAvailable) {
            promptUsern({
              title,
              message,
              buttonUpgradeText,
              buttonCancelText,
              forceUpgrade,
              localVersion,
              bundleIdentifier,
            });
          }
        }
      );
  } else {
    NativeModules.InAppUpdate.checkUpdate();
  }
};

export default RgInAppUpdates;
