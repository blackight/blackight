module.exports = {
  entry:  "./app/src.js",
  output: {
    path: __dirname + "/public",
    filename: "main.js"
  },
  module : {
    rules:[
      {
        test:/\.css$/,
        use:["style-loader","css-loader"]
      }
    ]
  }
}
