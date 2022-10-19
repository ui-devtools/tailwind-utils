import fs from 'fs';
import { describe, expect, test } from '@jest/globals';

import Tailwind from './index';
const config = require('./tailwind.config');
const { parse, classname, meta } = Tailwind(config);

const isPseudoState = (selector) => {
  return Boolean(
    meta.pseudoModifiers.find((modifier) => {
      if (selector.endsWith(':' + modifier)) return true;
    })
  );
};

const compositeClassNames = [
  'container',
  'sr-only',
  'not-sr-only',
  'transform',
  'transform-gpu',
  'scale-*',
  'skew-*',
  'rotate-*',
  'rounded-t',
  'rounded-r',
  'rounded-b',
  'rounded-l'
];

// todo: pick class names from docs or files and put them in a list here
const source = fs.readFileSync('./fixtures/tailwind-2.css', 'utf8');
const selectors = source.split('}\n').map((code) => code.split('{')[0].trim());
const classNames = selectors
  .filter((selector) => selector.startsWith('.'))
  .filter((selector) => !selector.includes(' '))
  .map((selector) => selector.replace('.', ''))
  .map((selector) => selector.replace('\\', ''))
  .filter((selector) => !isPseudoState(selector));

describe('generated suite', () => {
  // test.only('debug', async () => {
  //   const originalClassName = 'flex-nowrap';
  //   const definition = parse(originalClassName);
  //   console.log(definition);
  //   const { className: generatedClassName } = classname(definition);
  //   assert.equal(generatedClassName, originalClassName);
  // });

  // todo: it crashes trying to handle 24000 classes 😅

  classNames.slice(0, 10000).forEach((fixture) => {
    if (compositeClassNames.find((pattern) => fixture.match(pattern))) {
      // test.skip(fixture);
      return;
    }

    test(fixture, async () => {
      // TODO: how do we test composite values

      const originalClassName = fixture;
      const { className, relatedProperties, ...definition } = parse(originalClassName);
      const { className: generatedClassName } = classname(definition);

      if (knownEquals[originalClassName]) expect(generatedClassName).toEqual(knownEquals[originalClassName]);
      else expect(generatedClassName).toEqual(originalClassName);
    });
  });
});

const knownEquals = {
  container: 'w-full',
  'order-first': '-order-last'
};

[
  'inset',
  'inset-x',
  'inset-y',
  'top',
  'right',
  'bottom',
  'left',
  'h',
  'w',
  'translate',
  'translate-x',
  'translate-y'
].forEach((property) => {
  knownEquals[property + '-' + '2/4'] = property + '-' + '1/2';
  knownEquals['-' + property + '-' + '2/4'] = '-' + property + '-' + '1/2';
});

['h', 'w'].forEach((property) => {
  knownEquals[property + '-2/6'] = property + '-1/3';
  knownEquals['-' + property + '-2/6'] = '-' + property + '-1/3';
  knownEquals[property + '-3/6'] = property + '-1/2';
  knownEquals['-' + property + '-3/6'] = '-' + property + '-1/2';
  knownEquals[property + '-4/6'] = property + '-2/3';
  knownEquals['-' + property + '-4/6'] = '-' + property + '-2/3';
  knownEquals[property + '-3/6'] = property + '-1/2';
  knownEquals['-' + property + '-3/6'] = '-' + property + '-1/2';

  knownEquals[property + '-2/12'] = property + '-1/6';
  knownEquals['-' + property + '-2/12'] = '-' + property + '-1/6';
  knownEquals[property + '-3/12'] = property + '-1/4';
  knownEquals['-' + property + '-3/12'] = '-' + property + '-1/4';
  knownEquals[property + '-4/12'] = property + '-1/3';
  knownEquals['-' + property + '-4/12'] = '-' + property + '-1/4';
  knownEquals[property + '-6/12'] = property + '-1/2';
  knownEquals['-' + property + '-6/12'] = '-' + property + '-' + '1/2';
  knownEquals[property + '-8/12'] = property + '-2/3';
  knownEquals['-' + property + '-8/12'] = '-' + property + '-' + '2/3';
  knownEquals[property + '-9/12'] = property + '-3/4';
  knownEquals['-' + property + '-9/12'] = '-' + property + '-' + '3/4';
  knownEquals[property + '-10/12'] = property + '-5/6';
  knownEquals['-' + property + '-10/12'] = '-' + property + '-' + '5/6';
});
