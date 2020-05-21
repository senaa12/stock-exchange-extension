const path = require('path');

module.exports = {
    // does not work with Typescript
    process(src, filename, config, options) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    }
};
