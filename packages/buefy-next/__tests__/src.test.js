'use strict';

const src = require('..');
const assert = require('assert').strict;

assert.strictEqual(src(), 'Hello from src');
console.info('src tests passed');
