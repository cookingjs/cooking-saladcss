/**
 * @param  {object} cooking - add, remove and config
 * @param  {*} options - custom option
 */
module.exports = function (cooking, options) {
  cooking.add('vue.autoprefixer', false)

  var version = cooking.version

  version = version ? Number(version.split('.')[0]) : 0

  var plugins = function (webpack) {
    options = options || {}
    options.features = options.features || {}
    options.features.partialImport = options.features.partialImport || {}
    options.features.partialImport.addDependencyTo = webpack

    return version < 1 ? [require('postcss-salad')(options)] : require('postcss-salad')(options)
  }

  if (version < 1) {
    cooking.add('preLoader.postcss', {
      test: /\.css$/,
      loaders: ['postcss-loader']
    })
  }

  cooking.add('vue.postcss', plugins)
  cooking.add('postcss', plugins)
}
