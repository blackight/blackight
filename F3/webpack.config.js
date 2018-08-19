module.exports={
  devtool:"eval-source-map",
  entry:"./src/src.js",
  output:{
    path:__dirname+"/public",
    filename:"main.js",
  },
  devServer:{
    contentBase:"./public",
    historyApiFallback:true,
    inline:true
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}
