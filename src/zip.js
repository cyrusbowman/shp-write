var write = require('./write'),
    geojson = require('./geojson'),
    defaultPrj = require('./prj'),
    JSZip = require('jszip');

module.exports = function(gj, options) {

    var zip = new JSZip();
    var prj = (options && options.prj) ? options.prj : defaultPrj;
    var type = (options && options.type) ? options.type : (!process.browser ? 'nodebuffer' : 'base64');

    [geojson.point(gj), geojson.pointZ(gj), geojson.line(gj), geojson.lineZ(gj), geojson.polygon(gj), geojson.polygonZ(gj)]
        .forEach(function(l) {
        if (l.geometries.length && l.geometries[0].length) {
            write(
                // field definitions
                l.properties,
                // geometry type
                l.type,
                // geometries
                l.geometries,
                function(err, files) {
                    var fileName = options && options.types && options.types[l.type.toLowerCase()] ? options.types[l.type.toLowerCase()] : l.type;
                    zip.file(fileName + '.shp', files.shp.buffer, { binary: true });
                    zip.file(fileName + '.shx', files.shx.buffer, { binary: true });
                    zip.file(fileName + '.dbf', files.dbf.buffer, { binary: true });
                    zip.file(fileName + '.prj', prj);
                });
        }
    });
    var generateOptions = { compression:'STORE', type: type};
    return zip.generateAsync(generateOptions);
};
