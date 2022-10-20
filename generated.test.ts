import fs from 'fs';
import { describe, test, assert } from 'vitest';

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

meta.responsiveModifiers.push('32xl');
const isResponsive = (selector) => {
  return Boolean(
    meta.responsiveModifiers.find((modifier) => {
      if (selector.includes(modifier + ':')) return true;
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
  'rounded-*',
  'truncate',
  'break-normal',
  'antialiased',
  'outline-none',
  'backdrop-filter',
  'filter',
  'transition-*'
];

const source = fs.readFileSync('./fixtures/tailwind-2.css', 'utf8');
const selectors = source.split('}\n').map((code) => code.split('{')[0].trim());
const classNames = selectors
  .filter((selector) => selector.startsWith('.'))
  .filter((selector) => !selector.includes(' '))
  .filter((selector) => !selector.includes(','))
  .map((selector) => selector.replace('.', ''))
  .map((selector) => selector.replace('\\:', ':'))
  .map((selector) => selector.replace('\\.', '.'))
  .map((selector) => selector.replace('\\/', '/')) // 1\/2 → 1/2
  .map((selector) => selector.replace('::placeholder', ''))
  .filter((selector) => !isPseudoState(selector))
  .filter((selector) => !isResponsive(selector));

describe('generated suite', () => {
  // test.only('debug', async () => {
  //   const originalClassName = 'ease-in-out';
  //   const definition = parse(originalClassName);
  //   console.log(definition);
  //   const { className: generatedClassName, error } = classname(definition);
  //   console.log({ generatedClassName, error });
  //   assert.equal(originalClassName, generatedClassName);
  // });
  // return;

  classNames.forEach((fixture) => {
    if (compositeClassNames.find((pattern) => fixture.match(pattern))) {
      test.skip(fixture);
      return;
    }

    test(fixture, async () => {
      // TODO: how do we test composite values

      const originalClassName = fixture;
      const { className, relatedProperties, ...definition } = parse(originalClassName);
      const { className: generatedClassName } = classname(definition);

      if (knownEquals[originalClassName]) assert.equal(generatedClassName, knownEquals[originalClassName]);
      else assert.equal(originalClassName, generatedClassName);
    });
  });
});

const knownEquals = {
  'decoration-clone': 'box-decoration-clone',
  'decoration-slice': 'box-decoration-slice',
  'backdrop-blur-none': 'backdrop-blur-0',
  'blur-none': 'blur-0',
  'ease-in-out': 'ease'
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
