#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const UglifyJS = require('uglify-js');

const JS_SRC = '_javascript';
const JS_DEST = 'assets/js/dist';

const COPYRIGHT = fs.readFileSync(path.join(JS_SRC, 'copyright'), 'utf8');

// Bundle definitions — mirrors the original Gulp task definitions
const BUNDLES = {
  commons: [
    `${JS_SRC}/commons/*.js`
  ],
  home: [
    `${JS_SRC}/commons/*.js`,
    `${JS_SRC}/utils/locale-datetime.js`
  ],
  post: [
    `${JS_SRC}/commons/*.js`,
    `${JS_SRC}/utils/img-extra.js`,
    `${JS_SRC}/utils/locale-datetime.js`,
    `${JS_SRC}/utils/clipboard.js`,
    `${JS_SRC}/utils/smooth-scroll.js`
  ],
  categories: [
    `${JS_SRC}/commons/*.js`,
    `${JS_SRC}/utils/category-collapse.js`
  ],
  page: [
    `${JS_SRC}/commons/*.js`,
    `${JS_SRC}/utils/img-extra.js`,
    `${JS_SRC}/utils/clipboard.js`,
    `${JS_SRC}/utils/smooth-scroll.js`
  ],
  misc: [
    `${JS_SRC}/commons/*.js`,
    `${JS_SRC}/utils/locale-datetime.js`
  ],
  pvreport: [
    `${JS_SRC}/utils/pageviews.js`
  ]
};

/** Expand a glob pattern of the form "dir/*.js" into sorted file paths. */
function expandGlob(pattern) {
  if (!pattern.endsWith('/*.js')) {
    return [pattern];
  }
  const dir = pattern.slice(0, -5); // strip /*.js
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .sort()
    .map(f => path.join(dir, f));
}

/** Concatenate an array of glob patterns into a single string. */
function concatFiles(patterns) {
  return patterns
    .flatMap(expandGlob)
    .map(f => fs.readFileSync(f, 'utf8'))
    .join('\n');
}

/** Minify source text, preserving licence comments. */
function minify(src) {
  const result = UglifyJS.minify(src, {
    output: { comments: /^!|@preserve|@license|@cc_on/i }
  });
  if (result.error) throw result.error;
  return result.code;
}

/** Build a single named bundle and write it to JS_DEST. */
function buildBundle(name, patterns) {
  const src = concatFiles(patterns);
  const minified = minify(src);
  const output = COPYRIGHT + minified + '\n';
  fs.mkdirSync(JS_DEST, { recursive: true });
  fs.writeFileSync(path.join(JS_DEST, `${name}.min.js`), output, 'utf8');
  console.log(`  built ${name}.min.js`);
}

/** Build all bundles. */
function buildAll() {
  console.log('Building JS bundles...');
  for (const [name, patterns] of Object.entries(BUNDLES)) {
    buildBundle(name, patterns);
  }
  console.log('Done.');
}

// Entry point
buildAll();

if (process.argv.includes('--watch')) {
  console.log(`Watching ${JS_SRC}/ for changes...`);
  fs.watch(JS_SRC, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.js')) {
      console.log(`Change detected: ${filename}`);
      buildAll();
    }
  });
}
