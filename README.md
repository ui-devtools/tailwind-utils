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
import { parse, create, Definition } from 'tailwind-utils'
import theme from './tailwind-theme.js'

const definition:Definition = parse(theme, 'md:w-48');
// { responsiveModifier: 'md', property: 'width', prefix: 'w', value: 48 }

const className:string = create(theme, { responsiveModifier: 'md', pseudoModifier: 'hover', property: 'backgroundColor', value: 'red-500' })
// 'md:hover:bg-48'
```

API choice 2:

```ts
import { ClassName, Definition } from 'tailwind-utils'
import theme from './tailwind-theme.js'

const { parse, create } = ClassName(theme)

const definition:Definition = parse('md:w-48');
// { responsiveModifier: 'md', property: 'width', prefix: 'w', value: 48 }

const className:string = create({ responsiveModifier: 'md', pseudoModifier: 'hover', property: 'backgroundColor', value: 'red-500' })
// 'md:hover:bg-48'
```

### TODOs

- [ ] Set up repo
- [ ] Set up typescript
- [ ] Set up tests
- [ ] Parse [theme file](https://tailwindcss.com/docs/configuration#creating-your-configuration-file)
- [ ] parse: key-value
- [ ] parse: key without value (like [`border`](https://tailwindcss.com/docs/border-width)
- [ ] parse: value without key (like [`block`](https://tailwindcss.com/docs/display#block))
- [ ] parse: [responsive modifier](https://tailwindcss.com/docs/responsive-design)
- [ ] parse: [pseudo modifier](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [ ] create: key-value
- [ ] create: key without value (like [`border`](https://tailwindcss.com/docs/border-width)
- [ ] create: value without key (like [`block`](https://tailwindcss.com/docs/display#block))
- [ ] create: [responsive modifier](https://tailwindcss.com/docs/responsive-design)
- [ ] create: [pseudo modifier](https://tailwindcss.com/docs/hover-focus-and-other-states)


