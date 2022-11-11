<p align="center">
  <img src="https://avatars2.githubusercontent.com/u/71650913?s=200&v=4" height="50px"/>
  <br><br>
  <b>Utilities to parse and create tailwind classnames</b>
  <br><br/>
  <img src="https://github.com/ui-devtools/tailwind-utils/actions/workflows/test.yml/badge.svg"/>
</p>

&nbsp;

### Installation

```
yarn add tailwind-utils

or

npm install tailwind-utils
```

&nbsp;

### Usage

```ts
import createUtils from 'tailwind-utils';
import config from './tailwind.config.js';

const { parse, classname } = createUtils(config);

const definition = parse('w-48');
// { prefix: 'w', property: 'width', value: '12rem' }

const definition = parse('md:hover:bg-red-200/50');
// { responsiveModifier: 'md', pseudoModifier: 'hover', property: 'backgroundColor' value: '#fecaca80' }

const { className } = classname({ property: 'margin', value: '-16rem' });
// -m-64

const { className } = classname({
  responsiveModifier: 'md',
  pseudoModifier: 'hover',
  property: 'backgroundColor',
  value: 'fecaca80'
});
// md:hover:bg-red-200/50

const { className, error } = classname({
  responsiveModifier: 'small',
  property: 'textColor',
  value: 'fecaca80'
});
/*
{
  error: {
    responsiveModifier: 'Unidentified responsive modifier, expected one of [sm, md, lg, xl, 2xl], got small'
  }
}
*/
```

&nbsp;

#### like it?

:star: this repo

&nbsp;

#### license

MIT © [siddharthkp](https://github.com/siddharthkp)
