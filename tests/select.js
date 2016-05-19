var Similar = require('../src/similar');

describe("map may or may not exist", () => {
	var MapOrSimilar = require('../src/map-or-similar'),
		mapOrSimilar = new MapOrSimilar();

	it("chose Map because it exists", () => { expect(mapOrSimilar instanceof Map).toEqual(true); });
	it("was forced to similar", () => { expect(mapOrSimilar instanceof Similar).toEqual(false); });
});

describe("force similar", () => {
	process.env.TEST_MAPORSIMILAR = true;
	var MapOrSimilar = require('../src/similar'),
		mapOrSimilar = new MapOrSimilar();

	it("was forced to similar", () => { expect(mapOrSimilar instanceof Similar).toEqual(true); });
	it("was forced to similar", () => { expect(mapOrSimilar instanceof Map).toEqual(false); });
});
