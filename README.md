# Easy Webpack Config
Load webpack config based on node environment.

###Usage
```
$ npm i easy-webpack-config
$ mkdir webpack
$ $editor webpack/default.js


module.export = {
  entry: "./app/app.js",
	output: {
		path: path.join(__dirname, "assets"),
		publicPath: "assets/",
		filename: "main.js", 
	},
	module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
};
```

**Now add a config for production**

```
$ $editor webpack/production.js


const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
```
**Now add easy-webpack-config to your ```webpack.config.js```**

```
const ebc = require('easy-webpack-config');

module.exports = ebc.getEnvConfig

```

Now when you run webpack, files will be built based on your NODE_ENV.
