import { describe, test, assert } from 'vitest';

import Tailwind from './index';
const config = require('./tailwind.config');
const { classname } = Tailwind(config);

describe('classname', () => {
  test('m-4', async () => {
    assert.deepEqual(
      { className: 'm-4' },
      classname({
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
        property: 'width',
        value: '12rem'
      })
    );
  });

  test('text-sm', () => {
    assert.deepEqual(
      { className: 'text-sm' },
      classname({
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

  test.only('color instead of textColor', () => {
    assert.deepEqual(
      { error: { property: 'UNIDENTIFIED_PROPERTY, did you mean textColor?' } },
      classname({
        responsiveModifier: 'md',
        pseudoModifier: 'hover',
        property: 'color',
        value: '#2563eb'
      })
    );
  });

  test('hover:bg-green-100', () => {
    assert.deepEqual(
      { className: 'hover:bg-green-100' },
      classname({
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
        property: 'position',
        value: 'absolute'
      })
    );
  });

  test('font-serif', () => {
    assert.deepEqual(
      { className: 'font-serif' },
      classname({
        property: 'fontFamily',
        value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
      })
    );
  });

  test('drop-shadow-md', () => {
    assert.deepEqual(
      { className: 'drop-shadow-md' },
      classname({
        property: 'dropShadow',
        value: '0 4px 3px rgb(0 0 0 / 0.07), 0 2px 2px rgb(0 0 0 / 0.06)'
      })
    );
  });

  test('-m-64', () => {
    assert.deepEqual(
      { className: '-m-64' },
      classname({
        property: 'margin',
        value: '-16rem'
      })
    );
  });

  test('block', () => {
    assert.deepEqual(
      { className: 'block' },
      classname({
        property: 'display',
        value: 'block'
      })
    );
  });

  test('tracking-tighter', () => {
    assert.deepEqual(
      { className: 'tracking-tighter' },
      classname({
        property: 'letterSpacing',
        value: '-0.05em'
      })
    );
  });

  test.todo('composite class', () => {
    assert.deepEqual(
      { className: 'sr-only' },
      classname({
        property: 'composite',
        value: null,
        relatedProperties: {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal'
        }
      })
    );
  });

  test('bg-red-200/50', () => {
    assert.deepEqual(
      { className: 'bg-red-200/50' },
      classname({
        property: 'backgroundColor',
        value: '#fecaca80'
      })
    );
  });

  test('bg-red-200/50 uppercase', () => {
    assert.deepEqual(
      { className: 'bg-red-200/50' },
      classname({
        property: 'backgroundColor',
        value: '#FECACA80'
      })
    );
  });

  test('unsupported color format', () => {
    assert.deepEqual(
      { error: { value: 'Only hex values are supported, example: #fecaca80' } },
      classname({
        property: 'backgroundColor',
        value: 'rgb(255,255,255)'
      })
    );
  });

  // todo: unhandled color shorthand/longhand
  test.todo('bg-black/50 shortform', () => {
    assert.deepEqual(
      { className: 'bg-black/50' },
      classname({
        property: 'backgroundColor',
        value: '#0008'
      })
    );
  });

  // todo: black is stored as #000 in theme instead of full value :/
  test.todo('bg-black', () => {
    assert.deepEqual(
      { className: 'bg-black' },
      classname({
        property: 'backgroundColor',
        value: '#000000'
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

        property: 'fontSize',
        value: '1.5em' // should be rem
      })
    );
  });
});
