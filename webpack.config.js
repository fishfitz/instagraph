const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: require.resolve('vue-loader'),
          options: {
            reactivityTransform: true
          }
        }]
      },
      {
        test: /\.css$/i,
        use: [
          require.resolve('vue-style-loader'),
          require.resolve('css-loader')
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          require.resolve('vue-style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader')
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    require('unplugin-auto-import/webpack')({
      imports: ['vue']
    })
  ]
}
