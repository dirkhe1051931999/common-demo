module.exports = {
  plugins: [require('postcss-cssnext')({}), require('postcss-px2rem')({ remUnit: 75 })]
}
