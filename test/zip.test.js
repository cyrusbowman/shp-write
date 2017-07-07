var shpWrite = require('../');
var expect = require('expect.js');

describe('zip', function() {
    it('creates a zip from geojson with a single point', function() {
      let geojson = {
          type: 'FeatureCollection',
          features: [
              {
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [0, 0]
                  },
                  properties: {
                      foo: 'bar'
                  }
              }
          ]
      };
      let a = shpWrite.zip(geojson);
    });
    it('creates a zip from geojson with multiple points', function() {
      let geojson = {
          type: 'FeatureCollection',
          features: [
              {
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [0, 0]
                  },
                  properties: {
                      foo: 'bar'
                  }
              },
              {
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [0, 0]
                  },
                  properties: {
                      foo: 'bar'
                  }
              }
          ]
      };
      let a = shpWrite.zip(geojson);
    });
});
