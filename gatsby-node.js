var rucksack = require('rucksack-css')
var lost = require("lost")
var cssnext = require("postcss-cssnext")

// require('dotenv').config()
// console.log("process.env:", process.env.GH_BLOG_APP_CLIENT_ID);

exports.modifyWebpackConfig = function(config, env) {
    config.merge({
        postcss: [
            lost(),
            rucksack(),
            cssnext({
                browsers: ['>1%', 'last 2 versions']
            })
        ]
    })

    config.loader('svg', {
       test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'file-loader',
    })

    return config
};
