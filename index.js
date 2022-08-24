import { Platform, NativeModules } from "react-native";

const RgInAppUpdates = () => {
  if (Platform.OS === "ios") {
    performCheck().then(({ updateIsAvailable }) => {
      if (updateIsAvailable) {
        promptUser();
      }
    });
  } else {
    console.log("cek update");
    NativeModules.InAppUpdate.checkUpdate();
  }
};

export default RgInAppUpdates;
