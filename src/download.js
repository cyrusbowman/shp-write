var zip = require('./zip');

module.exports = function(gj, opts) {
    let options = opts || {};
    options.type = 'base64';
    return zip(gj, options).then((content) => {
      location.href = 'data:application/zip;base64,' + content;
    });
};
