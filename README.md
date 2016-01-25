# Easy Webpack Config
Load webpack config based on node environment.

###Install
```npm i easy-webpack-config```

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


**Using ```easy.webpack.config.js``` config file**

Easy webpack config takes this optional ```js``` file as ```config```

This config can have the ```context``` of the app and the ```file mapping``` for each environment.

The ```config``` looks like this

```
module.exports = {
  context: __dirname, //context of your webpack folder.
  fileMapping: { //file names of the config to be used for different ENVs.
    default: 'default',
    staging: 'staging',
    production: 'production',
  },
};

```

Now when you run webpack, files will be built based on your NODE_ENV config.


**NOTE: ```default.js``` is a required file. Easy webpack config will take the base config from ```default.js``` and override the common fields with your ```[ENV].js```'s value.**



Inspired by [node-config](https://github.com/lorenwest/node-config)
