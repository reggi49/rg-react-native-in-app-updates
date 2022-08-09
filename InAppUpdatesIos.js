import React from "react";
import { Alert, Linking } from "react-native";
import DeviceInfo from "react-native-device-info";
import axios from "axios";

const defaultCheckOptions = {
  bundleId: DeviceInfo.getBundleId(),
  country: undefined,
};

const createAPI = () => {
  const api = axios.create({
    baseURL: "https://itunes.apple.com/",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 10000,
  });

  return {
    getLatest: (bundleId) => api.get("lookup?bundleId=" + bundleId),
  };
};

const performCheck = ({
  bundleId = defaultCheckOptions.bundleId,
  country,
} = defaultCheckOptions) => {
  let updateIsAvailable = false;
  const api = createAPI();

  return api.getLatest(bundleId, country).then((response) => {
    let latestInfo = null;
    if (response.data.resultCount === 1) {
      latestInfo = response.data.results[0];
      updateIsAvailable = latestInfo.version !== DeviceInfo.getVersion();
    }

    return { updateIsAvailable, ...latestInfo };
  });
};

const attemptUpgrade = (appId) => {
  const appStoreURI = `itms-apps://apps.apple.com/app/id${appId}?mt=8`;
  const appStoreURL = `https://apps.apple.com/app/id${appId}?mt=8`;

  Linking.canOpenURL(appStoreURI).then((supported) => {
    if (supported) {
      Linking.openURL(appStoreURI);
    } else {
      Linking.openURL(appStoreURL);
    }
  });
};

const showUpgradePrompt = (
  appId,
  {
    title = title || "Update Available",
    message = message ||
      "There is an updated version available on the App Store. Would you like to upgrade?",
    buttonUpgradeText = buttonUpgradeText || "Upgrade",
    buttonCancelText = buttonCancelText || "Cancel",
    forceUpgrade = false,
  }
) => {
  const buttons = [
    {
      text: buttonUpgradeText,
      onPress: () => attemptUpgrade(appId),
    },
  ];

  if (forceUpgrade === false) {
    buttons.push({ text: buttonCancelText });
  }

  Alert.alert(title, message, buttons, { cancelable: !!forceUpgrade });
};

export const promptUser = (
  defaultOptions = {},
  versionSpecificOptions = [],
  bundleId,
  country = undefined
) => {
  performCheck({ bundleId, country }).then((result) => {
    if (result.updateIsAvailable) {
      const options =
        versionSpecificOptions.find(
          (o) => o.localVersion === DeviceInfo.getVersion()
        ) || defaultOptions;

      showUpgradePrompt(result.trackId, options);
    }
  });
};

export default performCheck;
