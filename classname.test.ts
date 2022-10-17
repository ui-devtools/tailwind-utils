import { describe, test, assert } from 'vitest';

import Tailwind from './index';
const config = require('./tailwind.config');
const { classname } = Tailwind(config);

describe('classname', () => {
  test('m-4', async () => {
    assert.deepEqual(
      { className: 'm-4' },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'margin',
        value: '1rem'
      })
    );
  });

  test('md:w-48', () => {
    assert.deepEqual(
      { className: 'md:w-48' },
      classname({
        responsiveModifier: 'md',
        pseudoModifier: null,
        property: 'width',
        value: '12rem'
      })
    );
  });

  test('text-sm', () => {
    assert.deepEqual(
      { className: 'text-sm' },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'fontSize',
        value: '0.875rem'
      })
    );
  });

  test('md:hover:text-blue-600', () => {
    assert.deepEqual(
      { className: 'md:hover:text-blue-600' },
      classname({
        responsiveModifier: 'md',
        pseudoModifier: 'hover',
        property: 'textColor',
        value: '#2563eb'
      })
    );
  });

  test('hover:bg-green-100', () => {
    assert.deepEqual(
      { className: 'hover:bg-green-100' },
      classname({
        responsiveModifier: null,
        pseudoModifier: 'hover',
        property: 'backgroundColor',
        value: '#dcfce7'
      })
    );
  });

  test('absolute', () => {
    assert.deepEqual(
      { className: 'absolute' },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'position',
        value: 'absolute'
      })
    );
  });

  test('font-serif', () => {
    assert.deepEqual(
      { className: 'font-serif' },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'fontFamily',
        value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
      })
    );
  });

  test('drop-shadow-md', () => {
    assert.deepEqual(
      { className: 'drop-shadow-md' },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'dropShadow',
        value: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)'
      })
    );
  });

  // todo: unhandled input
  test('block', () => {
    assert.deepEqual(
      { error: { property: 'UNIDENTIFIED_PROPERTY' } },
      classname({
        responsiveModifier: null,
        pseudoModifier: null,
        property: 'display',
        value: 'block'
      })
    );
  });

  // incorrect input
  test('incorrect responsive modifier', () => {
    assert.deepEqual(
      {
        error: {
          responsiveModifier: 'Unidentified responsive modifier, expected one of [sm, md, lg, xl, 2xl], got small'
        }
      },
      classname({
        responsiveModifier: 'small',
        pseudoModifier: null,
        property: 'backgroundColor',
        value: '#dcfce7'
      })
    );
  });

  test('incorrect pseudo modifier', () => {
    assert.deepEqual(
      {
        error: {
          pseudoModifier:
            'Unidentified pseudo modifier, expected one of [first, last, odd, even, visited, checked, empty, read-only, group-hover, group-focus, focus-within, hover, focus, focus-visible, active, disabled], got hovers'
        }
      },
      classname({
        responsiveModifier: null,
        pseudoModifier: 'hovers',
        property: 'backgroundColor',
        value: '#dcfce7'
      })
    );
  });

  test('incorrect property', () => {
    assert.deepEqual(
      { error: { property: 'UNIDENTIFIED_PROPERTY' } },
      classname({
        responsiveModifier: 'sm',
        pseudoModifier: null,
        property: 'fontSizes',
        value: '1.5rem'
      })
    );
  });

  test('incorrect value', () => {
    assert.deepEqual(
      { error: { value: 'UNIDENTIFIED_VALUE' } },
      classname({
        responsiveModifier: 'sm',
        pseudoModifier: null,
        property: 'fontSize',
        value: '1.5em' // should be rem
      })
    );
  });
});
