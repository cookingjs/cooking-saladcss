/**
 * @param  {object} cooking - add, remove and config
 * @param  {*} options - custom option
 */
module.exports = function (cooking, options) {
  cooking.add('vue.autoprefixer', false)

  var version = cooking.version

  if (version < '1.2.0') {
    throw Error('不再支持该插件，请使用 postcss 配置文件进行配置，参考 https://github.com/michael-ciniawsky/postcss-load-config')
  }

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
    cooking.add('vue.postcss', plugins)
  }

  cooking.add('postcss', plugins)
}
