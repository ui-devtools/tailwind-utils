<p align="center">
  <img src="https://avatars2.githubusercontent.com/u/71650913?s=200&v=4" height="50px"/>
  <br><br>
  <b>Utilities to parse and create tailwind classnames</b>
  <br><br/>
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

API choice 1:

```ts
import createUtils from 'tailwind-utils';
import config from './tailwind.config.js';

const { parse, classname } = createUtils(config);

const definition = parse('md:w-48');
// { responsiveModifier: 'md', prefix: 'w', property: 'width',  value: '12rem' }

const className = classname({
  pseudoModifier: 'hover',
  property: 'backgroundColor',
  value: 'fecaca80'
});
// hover:bg-red-200/50
```
