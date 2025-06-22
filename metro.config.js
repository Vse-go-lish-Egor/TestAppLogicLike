const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolver: defaultResolver } = getDefaultConfig(__dirname);

/**
 * Metro configuration for SVG support
 * https://reactnative.dev/docs/metro
 * 
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultResolver,
    assetExts: defaultResolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultResolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);