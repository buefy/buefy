'use strict';

const docs = require('..');
const assert = require('assert').strict;

assert.strictEqual(docs(), 'Hello from docs');
console.info('docs tests passed');
