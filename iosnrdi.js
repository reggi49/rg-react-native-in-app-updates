import { Alert, Linking } from "react-native";
import apisauce from "apisauce";

const defaultCheckOptions = {
  country: undefined,
};

const createAPI = () => {
  const api = apisauce.create({
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

const performCheckn = ({
  localVersion,
  bundleIdentifier,
  bundleId = bundleIdentifier,
  country,
} = defaultCheckOptions) => {
  let updateIsAvailable = false;
  const api = createAPI();

  return api.getLatest(bundleId, country).then((response) => {
    let latestInfo = null;
    if (response.data.resultCount === 1) {
      latestInfo = response.data.results[0];
      updateIsAvailable =
        latestInfo.version !== localVersion;
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
    title = title,
    message = message,
    buttonUpgradeText = buttonUpgradeText,
    buttonCancelText = buttonCancelText,
    forceUpgrade = forceUpgrade,
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
  localVersion,
  bundleIdentifier,
  bundleId = bundleIdentifier,
  country = undefined
) => {
  performCheck({ bundleId, country }).then((result) => {
    if (result.updateIsAvailable) {
      const options = localVersion;
      showUpgradePrompt(result.trackId, options);
    }
  });
};

export default performCheckn;
