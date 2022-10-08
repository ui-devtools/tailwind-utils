import { describe, test, assert } from 'vitest';

import Tailwind from './index';
const config = require('./tailwind.config');
const { parse } = Tailwind(config);

describe('parse', () => {
  test('m-4', async () => {
    assert.deepEqual(parse('m-4'), {
      className: 'm-4',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'margin',
      value: '1rem',
      relatedProperties: null
    });
  });

  test('md:w-48', async function () {
    assert.deepEqual(parse('md:w-48'), {
      className: 'md:w-48',
      responsiveModifier: 'md',
      pseudoModifier: null,
      property: 'width',
      value: '12rem',
      relatedProperties: null
    });
  });

  test('text-sm', async function () {
    assert.deepEqual(parse('text-sm'), {
      className: 'text-sm',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'fontSize',
      value: '0.875rem',
      relatedProperties: { lineHeight: '1.25rem' }
    });
  });

  test('md:hover:text-blue-600', async function () {
    assert.deepEqual(parse('md:hover:text-blue-600'), {
      className: 'md:hover:text-blue-600',
      responsiveModifier: 'md',
      pseudoModifier: 'hover',
      property: 'textColor',
      value: 'rgb(37 99 235)',
      relatedProperties: null
    });
  });

  test('absolute', async function () {
    assert.deepEqual(parse('absolute'), {
      className: 'absolute',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'position',
      value: 'absolute',
      relatedProperties: null
    });
  });

  test('font-serif', async function () {
    assert.deepEqual(parse('font-serif'), {
      className: 'font-serif',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'fontFamily',
      value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      relatedProperties: null
    });
  });

  test('drop-shadow-md', async function () {
    assert.deepEqual(parse('drop-shadow-md'), {
      className: 'drop-shadow-md',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'dropShadow',
      value: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)',
      relatedProperties: null
    });
  });
});
