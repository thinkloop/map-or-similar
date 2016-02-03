var Similar = require('../src/similar');

describe("MapOrSimilar Class", () => {
    describe("map may or may not exist", () => {
        var MapOrSimilar = require('../src/map-or-similar'),
            mapOrSimilar = new MapOrSimilar();

        if (!!Map) {
            it("chose Map because it exists", () => { expect(mapOrSimilar instanceof Map).toEqual(true); });
        }
        else {
            it("chose Similar because Map does not exist", () => { expect(mapOrSimilar instanceof Similar).toEqual(true); });
        }
    });

    describe("force similar", () => {
        process.env.TEST_MAPORSIMILAR = true;
        var MapOrSimilar = require('../src/similar'),
            mapOrSimilar = new MapOrSimilar();

        it("was forced to similar", () => { expect(mapOrSimilar instanceof Similar).toEqual(true); });
    });
});


describe("Similar Class", () => {

    // SET
    describe("SET", () => {
        describe("simple keys", () => {
            var similar = new Similar(),
                entry = { key: 'stringkey', val: 'stringval' };

            similar.set(entry.key, entry.val);

            it("has proper length", () => { expect(similar.list.length).toEqual(1); });
            it("has proper size", () => { expect(similar.size).toEqual(1); });
            it("has proper key", () => { expect(similar.list[0].key).toEqual(entry.key); });
            it("has proper val", () => { expect(similar.list[0].val).toEqual(entry.val); });
            it("has proper lastItem", () => { expect(similar.lastItem.key).toEqual(entry.key); expect(similar.lastItem.val).toEqual(entry.val); });
            it("resolves has() correctly", () => { expect(similar.has(entry.key)).toEqual(true); expect(similar.has(entry.val)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(entry.key)).toEqual(entry.val); });

        });

        describe("complex keys", () => {
            var similar = new Similar(),
                entry = { key: { prop: ['a', 'b'] }, val: { prop: 'val1' } };

            similar.set(entry.key, entry.val);

            it("has proper length", () => { expect(similar.list.length).toEqual(1); });
            it("has proper size", () => { expect(similar.size).toEqual(1); });
            it("has proper key", () => { expect(similar.list[0].key).toEqual(entry.key); });
            it("has proper val", () => { expect(similar.list[0].val).toEqual(entry.val); });
            it("has proper lastItem", () => { expect(similar.lastItem.key).toEqual(entry.key); expect(similar.lastItem.val).toEqual(entry.val); });
            it("resolves has() correctly", () => { expect(similar.has(entry.key)).toEqual(true); expect(similar.has(entry.val)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(entry.key)).toEqual(entry.val); });

            if (!!Map) {
                var map = new Map();
                map.set(entry.key, entry.val);
                it("matches Map get()", () => { expect(similar.get(entry.key)).toEqual(map.get(entry.key)); });
                it("matches Map has()", () => { expect(similar.has(entry.key)).toEqual(map.has(entry.key)); });
            }
        });

        describe("undefined keys and values", () => {
            var similar = new Similar(),
                entry = { key: undefined, val: undefined };

            similar.set(entry.key, entry.val);

            it("has proper length", () => { expect(similar.list.length).toEqual(1); });
            it("has proper size", () => { expect(similar.size).toEqual(1); });
            it("has proper key", () => { expect(similar.list[0].key).toEqual(entry.key); });
            it("has proper val", () => { expect(similar.list[0].val).toEqual(entry.val); });
            it("has proper lastItem", () => { expect(similar.lastItem.key).toEqual(entry.key); expect(similar.lastItem.val).toEqual(entry.val); });
            it("resolves has() correctly", () => { expect(similar.has(entry.key)).toEqual(true); expect(similar.has(null)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(entry.key)).toEqual(entry.val); });

            if (!!Map) {
                var map = new Map();
                map.set(entry.key, entry.val);
                it("matches Map get()", () => { expect(similar.get(entry.key)).toEqual(map.get(entry.key)); });
                it("matches Map has()", () => { expect(similar.has(entry.key)).toEqual(map.has(entry.key)); });
            }
        });

        describe("same keys (replace)", () => {
            var similar = new Similar(),
                key = { key: { prop: ['a', 'b'] }},
                val1 = 'val1',
                val2 = 'val2';

            similar.set(key, val1);
            similar.set(key, val2);
            similar.set(key, val1);
            similar.set(key, val2);

            it("has proper length", () => { expect(similar.list.length).toEqual(1); });
            it("has proper size", () => { expect(similar.size).toEqual(1); });
            it("has proper key", () => { expect(similar.list[0].key).toEqual(key); });
            it("has proper val", () => { expect(similar.list[0].val).toEqual(val2); });
            it("has proper lastItem", () => { expect(similar.lastItem.key).toEqual(key); expect(similar.lastItem.val).toEqual(val2); });
            it("resolves has() correctly", () => { expect(similar.has(key)).toEqual(true); expect(similar.has(val2)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(key)).toEqual(val2); });

            if (!!Map) {
                var map = new Map();

                map.set(key, val1);
                map.set(key, val2);
                map.set(key, val1);
                map.set(key, val2);

                it("matches Map get()", () => { expect(similar.get(key)).toEqual(map.get(key)); });
                it("matches Map has()", () => { expect(similar.has(key)).toEqual(map.has(key)); });
            }
        });
    });

    // DELETE
    describe("DELETE", () => {
        describe("simple key", () => {
            var similar = new Similar(),
                entry = { key: 'stringkey', val: 'stringval' };

            similar.set(entry.key, entry.val);
            similar.delete(entry.key);

            it("has proper length", () => { expect(similar.list.length).toEqual(0); });
            it("has proper size", () => { expect(similar.size).toEqual(0); });
            it("has proper lastItem", () => { expect(similar.lastItem).toEqual(undefined); });
            it("resolves has() correctly", () => { expect(similar.has(entry.key)).toEqual(false); expect(similar.has(undefined)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(entry.key)).toEqual(undefined); });
        });

        describe("complex key", () => {
            var similar = new Similar(),
                entry1 = { key: ['a','b'], val: { prop: 'propval' } },
                entry2 = { key: ['x','y'], val: { prop: 'propval2' } };

            similar.set(entry1.key, entry1.val);
            similar.set(entry2.key, entry2.val);
            similar.delete(entry1.key);

            it("has proper length", () => { expect(similar.list.length).toEqual(1); });
            it("has proper size", () => { expect(similar.size).toEqual(1); });
            it("has proper lastItem", () => { expect(similar.lastItem.key).toEqual(entry2.key); });
            it("resolves entry1 has() correctly", () => { expect(similar.has(entry1.key)).toEqual(false);  });
            it("resolves entry1 get() correctly", () => { expect(similar.get(entry1.key)).toEqual(undefined); });
            it("resolves entry2 has() correctly", () => { expect(similar.has(entry2.key)).toEqual(true); });
            it("resolves entry2 get() correctly", () => { expect(similar.get(entry2.key)).toEqual(entry2.val); });

            if (!!Map) {
                var map = new Map();

                map.set(entry1.key, entry1.val);
                map.set(entry2.key, entry2.val);
                map.delete(entry1.key);

                it("matches Map entry1 has() correctly", () => { expect(similar.has(entry1.key)).toEqual(map.has(entry1.key)); });
                it("matches Map entry1 get() correctly", () => { expect(similar.get(entry1.key)).toEqual(map.get(entry1.key)); });
                it("matches Map entry2 has() correctly", () => { expect(similar.has(entry2.key)).toEqual(similar.has(entry2.key)); });
                it("matches Map entry2 get() correctly", () => { expect(similar.get(entry2.key)).toEqual(similar.get(entry2.key)); });
            }
        });

        describe("from empty cache", () => {
            var similar = new Similar(),
                entry = { key: 'stringkey', val: 'stringval' };

            similar.delete(entry.key);

            it("has proper length", () => { expect(similar.list.length).toEqual(0); });
            it("has proper size", () => { expect(similar.size).toEqual(0); });
            it("has proper lastItem", () => { expect(similar.lastItem).toEqual(undefined); });
            it("resolves has() correctly", () => { expect(similar.has(entry.key)).toEqual(false); expect(similar.has(undefined)).toEqual(false); });
            it("resolves get() correctly", () => { expect(similar.get(entry.key)).toEqual(undefined); });

            if (!!Map) {
                var map = new Map();

                map.delete(entry.key);

                it("resolves has() correctly", () => { expect(map.has(entry.key)).toEqual(false); expect(map.has(undefined)).toEqual(false); });
                it("resolves get() correctly", () => { expect(map.get(entry.key)).toEqual(undefined); });
            }
        });
    });
});