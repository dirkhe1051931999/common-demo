var utils = require("loader-utils");
module.exports = function(source) {
  const options = utils.getOptions(this);
  source = source.replace("loader", options.loader);
  return `export const test = ${source}`;
};
