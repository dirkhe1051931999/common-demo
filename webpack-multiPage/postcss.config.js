module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // css3前缀
    autoprefixer: {
      browsers: ['defaults', 'not ie < 11', 'last 2 versions', '> 1%', 'iOS 7', 'last 3 iOS versions']
    },
    // px转rem
    'postcss-px2rem': { remUnit: 75 }
  }
}
