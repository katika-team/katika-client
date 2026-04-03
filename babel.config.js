module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@/lib': './lib',
            '@/services': './services',
            '@/store': './store',
            '@/hooks': './hooks',
            '@/components': './components',
            '@/assets': './assets',
            '@/constant': './constant',
          },
        },
      ],
    ],
  };
};
