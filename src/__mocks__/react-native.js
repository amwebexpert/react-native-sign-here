module.exports = {
  PixelRatio: {
    get: () => 1,
  },
  Platform: {
    select: options => options.ios || options.android || options.default,
  },
};
