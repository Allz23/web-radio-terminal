const path = require("path");

module.exports = {
 entry: "./src/public/js/front.js",
 output: {
  filename: "bundle-front.js",
  path: path.resolve(__dirname, "dist")
 }
};
