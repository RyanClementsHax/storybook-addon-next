# Storybook Addon Next <!-- omit in toc -->

**😱 No config support for Next.js**: Tired of writing and debugging webpack config? What Next.js supports out of the box, this addon makes possible in Storybook

[![current version](https://img.shields.io/npm/v/storybook-addon-next.svg)](https://www.npmjs.com/package/storybook-addon-next)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Table of Contents <!-- omit in toc -->

- [Supported Features](#supported-features)
- [Required Versions](#required-versions)
- [Examples](#examples)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Register the Addon in main.js](#register-the-addon-in-mainjs)
  - [Partay](#partay)
- [Documentation](#documentation)
  - [Next.js's Image Component](#nextjss-image-component)
    - [Local Images](#local-images)
    - [Remote Images](#remote-images)
    - [Optimization](#optimization)
    - [AVIF](#avif)
  - [Next.js Routing](#nextjs-routing)
    - [Overriding defaults](#overriding-defaults)
    - [Global Defaults](#global-defaults)
    - [Default Router](#default-router)
    - [Actions Integration Caveats](#actions-integration-caveats)
  - [Sass/Scss](#sassscss)
  - [Css/Sass/Scss Modules](#csssassscss-modules)
  - [Postcss](#postcss)
  - [Absolute Imports](#absolute-imports)
  - [Typescript](#typescript)
- [Similar Projects](#similar-projects)
- [Want to suggest additional features?](#want-to-suggest-additional-features)
- [Didn't find what you were looking for?](#didnt-find-what-you-were-looking-for)

## Supported Features

👉 [Next.js's Image Component](#nextjss-image-component)

👉 [Next.js Routing](#nextjs-routing)

👉 [Sass/Scss](#sassscss)

👉 [Css/Sass/Scss Modules](#csssassscss-modules)

👉 [Postcss](#postcss)

👉 [Absolute Imports](#absolute-imports)

👉 [Typescript](#typescript) (already supported out of the box by Storybook)

## Required Versions

- [Storybook](https://storybook.js.org/) >= 6.x
- [Next.js](https://nextjs.org/) >= 12.x

## Examples

- Nextjs v12 - [Source](./examples/nextv12/README.md)
- Tailwindcss - [Source](./examples/with-tailwindcss/README.md)

## Getting Started

### Installation

Install `storybook-addon-next` using [`yarn`](https://yarnpkg.com/en/package/storybook-addon-next):

```bash
yarn add --dev storybook-addon-next
```

Or [`npm`](https://www.npmjs.com/package/storybook-addon-next):

```bash
npm install --save-dev storybook-addon-next
```

### Register the Addon in main.js

```js
module.exports = {
  addons: ['storybook-addon-next']
}
```

### Partay

🥳🎉 Thats it! The [supported features](#supported-features) should work out of the box.

See [Documentation](#documentation) for more details on how the supported features work in this addon.

If something doesn't work as you would expect, feel free to [open up an issue](https://github.com/RyanClementsHax/storybook-addon-next/issues).

## Documentation

### Next.js's Image Component

[next/image](https://nextjs.org/docs/api-reference/next/image) is [notoriously difficult](https://github.com/vercel/next.js/issues/18393) to get working with storybook. This addon allows you to use Next.js's `Image` component with no configuration!

#### Local Images

[Local images](https://nextjs.org/docs/basic-features/image-optimization#local-images) work just fine with this addon!

```js
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="../public/me.png" set to equal the image itself (for this addon)
        // placeholder="blur" // Optional blur-up while loading
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}
```

#### Remote Images

[Remote images](https://nextjs.org/docs/basic-features/image-optimization#remote-images) also work just fine!

```js
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}
```

#### Optimization

All Next.js `Image`s are automatically [unoptimized](https://nextjs.org/docs/api-reference/next/image#unoptimized) for you.

If [placeholder="blur"](https://nextjs.org/docs/api-reference/next/image#placeholder) is used, the [blurDataURL](https://nextjs.org/docs/api-reference/next/image#blurdataurl) used is the [src](https://nextjs.org/docs/api-reference/next/image#src) of the image (thus effectively disabling the placeholder).

See [this issue](https://github.com/vercel/next.js/issues/18393) for more discussion on how Next.js `Image`s are handled for Storybook.

#### AVIF

This format is not supported by this addon yet. Feel free to [open up an issue](https://github.com/RyanClementsHax/storybook-addon-next/issues) if this is something you want to see.

### Next.js Routing

This solution is heavily based on [storybook-addon-next-router](https://github.com/lifeiscontent/storybook-addon-next-router) so a big thanks to `lifeiscontent` for providing a good solution that this addon could work off of.

[Next.js's router](https://nextjs.org/docs/routing/introduction) is automatically stubbed for you so that when the router is interacted with, all of its interactions are automatically logged to the [Storybook actions tab](https://storybook.js.org/docs/react/essentials/actions) if you have the actions addon.

#### Overriding defaults

Per-story overrides can be done by adding a `nextRouter` property onto the story [parameters](https://storybook.js.org/docs/react/writing-stories/parameters). The addon will shallowly merge whatever you put here into the router.

```js
import SomeComponentThatUsesTheRouter from "./SomeComponentThatUsesTheRouter";

export default {
  title: "My Story",
};

// if you have the actions addon
// you can click the links and see the route change events there
export const Example = () => <SomeComponentThatUsesTheRouter />;

Example.parameters: {
  nextRouter: {
    path: "/profile/[id]",
    asPath: "/profile/ryanclementshax",
    query: {
      id: "ryanclementshax"
    }
  }
}
```

#### Global Defaults

Global defaults can be set in [preview.js](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering) and will be shallowly merged with the default router.

```js
export const parameters = {
  nextRouter: {
    path: '/some-default-path',
    asPath: '/some-default-path',
    query: {}
  }
}
```

#### Default Router

The default values on the stubbed router are as follows (see [globals](https://storybook.js.org/docs/react/essentials/toolbars-and-globals#globals) for more details on how globals work)

```ts
const defaultRouter = {
  locale: context?.globals?.locale,
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push(...args: unknown[]) {
    action('nextRouter.push')(...args)
    return Promise.resolve(true)
  },
  replace(...args: unknown[]) {
    action('nextRouter.replace')(...args)
    return Promise.resolve(true)
  },
  reload(...args: unknown[]) {
    action('nextRouter.reload')(...args)
  },
  back(...args: unknown[]) {
    action('nextRouter.back')(...args)
  },
  prefetch(...args: unknown[]) {
    action('nextRouter.prefetch')(...args)
    return Promise.resolve()
  },
  beforePopState(...args: unknown[]) {
    action('nextRouter.beforePopState')(...args)
  },
  events: {
    on(...args: unknown[]) {
      action('nextRouter.events.on')(...args)
    },
    off(...args: unknown[]) {
      action('nextRouter.events.off')(...args)
    },
    emit(...args: unknown[]) {
      action('nextRouter.events.emit')(...args)
    }
  },
  isFallback: false
}
```

#### Actions Integration Caveats

If you override a function, you lose the automatic action tab integration and have to build it out yourself.

```js
export const parameters = {
  nextRouter: {
    push() {
      // we lose the default implementation that logs the action into the action tab
    }
  }
}
```

Doing this yourself looks something like this (make sure you install the `@storybook/addon-actions` package):

```js
import { action } from '@storybook/addon-actions'

export const parameters = {
  nextRouter: {
    push(...args) {
      // custom logic can go here
      // this logs to the actions tab
      action('nextRouter.push')(...args)
      // return whatever you want here
      return Promise.resolve(true)
    }
  }
}
```

### Sass/Scss

[Global sass/scss stylesheets](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) are supported without any additional configuration as well. Just import them into [preview.js](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering)

```js
import '../styles/globals.scss'
```

This will automatically include any of your [custom sass configurations](https://nextjs.org/docs/basic-features/built-in-css-support#customizing-sass-options) in your next.config.js file.

```js
const path = require('path')

module.exports = {
  // any options here are included in sass compilation for your stories
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}
```

### Css/Sass/Scss Modules

Next.js supports [css modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) out of the box so this addon supports it too.

```js
// this import works just fine in Storybook now
import styles from './Button.module.css'
// sass/scss is also supported
// import styles from './Button.module.scss'
// import styles from './Button.module.sass'

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  )
}
```

### Postcss

Next.js lets you [customize postcss config](https://nextjs.org/docs/advanced-features/customizing-postcss-config#default-behavior). Thus this addon will automatically handle your postcss config for you.

This allows for cool things like zero config tailwindcss! See the [with-tailwindcss example](examples/with-tailwindcss/README.md) for reference! Its a clone of [Next.js's tailwindcss example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss) set up with storybook and this addon.

### Absolute Imports

Goodbye `../`! Absolute imports from the root directory work just fine with this addon.

```js
// All good!
import Button from 'components/button'
// Also good!
import styles from 'styles/HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <h1 className={styles.title}>Hello World</h1>
      <Button />
    </>
  )
}
```

```js
// preview.js

// Also ok in preview.js!
import 'styles/globals.scss'

// ...
```

### Typescript

There is no special thing this addon does to support [Typescript](https://www.typescriptlang.org/) because Storybook already supports it out of the box. I just listed it in the [supported features](#supported-features) for completeness and not to confuse anyone comparing the list of "out of the box" [features](https://nextjs.org/docs/getting-started) Next.js has with this addon.

## Similar Projects

- [storybook-addon-next-router](https://github.com/lifeiscontent/storybook-addon-next-router)

## Want to suggest additional features?

I'm open to discussion. Feel free to [open up an issue](https://github.com/RyanClementsHax/storybook-addon-next/issues).

## Didn't find what you were looking for?

Was this documentation insufficient for you?

Was it confusing?

Was it ... dare I say ... inaccurate?

If any of the above describes your feelings of this documentation. Feel free to [open up an issue](https://github.com/RyanClementsHax/storybook-addon-next/issues).
