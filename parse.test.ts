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

  test('md:w-48', () => {
    assert.deepEqual(parse('md:w-48'), {
      className: 'md:w-48',
      responsiveModifier: 'md',
      pseudoModifier: null,
      property: 'width',
      value: '12rem',
      relatedProperties: null
    });
  });

  test('text-sm', () => {
    assert.deepEqual(parse('text-sm'), {
      className: 'text-sm',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'fontSize',
      value: '0.875rem',
      relatedProperties: { lineHeight: '1.25rem' }
    });
  });

  test('md:hover:text-blue-600', () => {
    assert.deepEqual(parse('md:hover:text-blue-600'), {
      className: 'md:hover:text-blue-600',
      responsiveModifier: 'md',
      pseudoModifier: 'hover',
      property: 'textColor',
      value: '#2563eb',
      relatedProperties: null
    });
  });

  test('hover:bg-green-100', () => {
    assert.deepEqual(parse('hover:bg-green-100'), {
      className: 'hover:bg-green-100',
      responsiveModifier: null,
      pseudoModifier: 'hover',
      property: 'backgroundColor',
      value: '#dcfce7',
      relatedProperties: null
    });
  });

  test('absolute', () => {
    assert.deepEqual(parse('absolute'), {
      className: 'absolute',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'position',
      value: 'absolute',
      relatedProperties: null
    });
  });

  test('font-serif', () => {
    assert.deepEqual(parse('font-serif'), {
      className: 'font-serif',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'fontFamily',
      value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      relatedProperties: null
    });
  });

  test('drop-shadow-md', () => {
    assert.deepEqual(parse('drop-shadow-md'), {
      className: 'drop-shadow-md',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'dropShadow',
      value: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)',
      relatedProperties: null
    });
  });

  // todo: unhandled input
  test('block', () => {
    assert.deepEqual(parse('block'), {
      className: 'block',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'ERROR',
      value: 'ERROR',
      relatedProperties: null
    });
  });

  // incorrect input
  test('hovers:bg-green-100', () => {
    assert.deepEqual(parse('hovers:bg-green-100'), {
      className: 'hovers:bg-green-100',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'backgroundColor',
      value: '#dcfce7',
      relatedProperties: null
    });
  });

  test('bg-green-1000', () => {
    assert.deepEqual(parse('bg-green-1000'), {
      className: 'bg-green-1000',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'ERROR',
      value: 'ERROR',
      relatedProperties: null
    });
  });
});
