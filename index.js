/**
 * @param  {object} cooking - add, remove and config
 * @param  {*} options - custom option
 */
module.exports = function (cooking, options) {
  var plugins = [
    require('postcss-salad')(options)
  ];

  cooking.add('preLoader.postcss', {
    test: /\.css$/,
    loaders: ['postcss-loader']
  });

  cooking.add('postcss', function () {
    return plugins
  });

  cooking.add('vue.postcss', function () {
    return plugins
  });
};
