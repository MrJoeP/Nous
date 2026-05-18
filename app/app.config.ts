import { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Nous',
  slug: 'nous',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/nous_logo.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    backgroundColor: '#000000',
    resizeMode: 'contain',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.nous.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/nous_logo.png',
      backgroundColor: '#000000',
    },
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-notifications',
      {
        icon: './assets/nous_logo.png',
        color: '#000000',
      },
    ],
  ],
  scheme: 'nous',
  extra: {
    claudeApiKey: process.env.CLAUDE_API_KEY,
  },
})
