/**
 * @param  {object} cooking - add, remove and config
 * @param  {*} options - custom option
 */
module.exports = function (cooking, options) {
  var version = cooking.version
  var plugins = function (webpack) {
    options = options || {}
    options.features = options.features || {}
    options.features.partialImport = options.features.partialImport || {}
    options.features.partialImport.addDependencyTo = webpack

    return [require('postcss-salad')(options)]
  }

  version = version ? Number(version.split('.')[0]) : 0
  if (version < 1) {
    cooking.add('vue.autoprefixer', false)
    cooking.add('preLoader.postcss', {
      test: /\.css$/,
      loaders: ['postcss-loader']
    })
    cooking.add('vue.postcss', plugins)
  }

  cooking.add('postcss', plugins)
}
