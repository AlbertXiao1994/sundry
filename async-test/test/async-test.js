const assert = require('assert');
const read = require('../async');

describe('#async.js', () => {
    describe('#asyncCalculate()', () => {
        it('#async function', async () => {
            let r = await read();
            assert.strictEqual(r, 15);
        });
    })
})