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
      relatedProperties: {}
    });
  });

  test('md:w-48', () => {
    assert.deepEqual(parse('md:w-48'), {
      className: 'md:w-48',
      responsiveModifier: 'md',
      pseudoModifier: null,
      property: 'width',
      value: '12rem',
      relatedProperties: {}
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
      relatedProperties: {}
    });
  });

  test('hover:bg-green-100', () => {
    assert.deepEqual(parse('hover:bg-green-100'), {
      className: 'hover:bg-green-100',
      responsiveModifier: null,
      pseudoModifier: 'hover',
      property: 'backgroundColor',
      value: '#dcfce7',
      relatedProperties: {}
    });
  });

  test('absolute', () => {
    assert.deepEqual(parse('absolute'), {
      className: 'absolute',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'position',
      value: 'absolute',
      relatedProperties: {}
    });
  });

  test('font-serif', () => {
    assert.deepEqual(parse('font-serif'), {
      className: 'font-serif',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'fontFamily',
      value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      relatedProperties: {}
    });
  });

  test('flex', () => {
    assert.deepEqual(parse('flex'), {
      className: 'flex',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'display',
      value: 'flex',
      relatedProperties: {}
    });
  });

  test('bg-red-200/50', () => {
    assert.deepEqual(parse('bg-red-200/50'), {
      className: 'bg-red-200/50',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'backgroundColor',
      value: '#fecaca80',
      relatedProperties: {}
    });
  });

  test('right-2/4', () => {
    assert.deepEqual(parse('right-2/4'), {
      className: 'right-2/4',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'right',
      value: '50%',
      relatedProperties: {}
    });
  });

  // composite values
  test('sr-only', () => {
    assert.deepEqual(parse('sr-only'), {
      className: 'sr-only',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'composite',
      value: null,
      relatedProperties: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0'
      }
    });
  });

  test('block', () => {
    assert.deepEqual(parse('block'), {
      className: 'block',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'display',
      value: 'block',
      relatedProperties: {}
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
      relatedProperties: {}
    });
  });

  test('bg-green-1000', () => {
    assert.deepEqual(parse('bg-green-1000'), {
      className: 'bg-green-1000',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'ERROR',
      value: 'ERROR',
      relatedProperties: {}
    });
  });

  test('drop-shadow-md', () => {
    assert.deepEqual(parse('drop-shadow-md'), {
      className: 'drop-shadow-md',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'dropShadow',
      value: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)',
      relatedProperties: {}
    });
  });

  test('sm:-m-64', () => {
    assert.deepEqual(parse('sm:-m-64'), {
      className: 'sm:-m-64',
      responsiveModifier: 'sm',
      pseudoModifier: null,
      property: 'margin',
      value: '-16rem',
      relatedProperties: {}
    });
  });

  test('bg-red-200/50', () => {
    assert.deepEqual(parse('bg-red-200/50'), {
      className: 'bg-red-200/50',
      responsiveModifier: null,
      pseudoModifier: null,
      property: 'backgroundColor',
      value: '#fecaca80',
      relatedProperties: {}
    });
  });
});
