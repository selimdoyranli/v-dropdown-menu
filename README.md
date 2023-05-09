[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![changelog][changelog-src]][changelog-href]
[![License][license-src]][license-href]

<p align="center">
  <a href="https://v-dropdown-menu.vercel.app" target="_blank"> 
    <img src='/meta/logo.png' width="256" />
  </a>
</p>

<p align="center">
<b>v-dropdown-menu</b>
</p>

<p align="center">
Customizable dropdown menu for vue 🟩🔽
</p>

<p align="center">
  <a href="https://v-dropdown-menu.vercel.app" target="_blank"> 
    <img src='/meta/preview.jpg' width="256" />
  </a>
</p>

<p align="center">
  <p align="center"><sub>Created by<sub></p>
    <p align="center">
	    <a href="https://radkod.com" target="_blank">
			<img src='/meta/radkod_signature.png' width="128" />
		</a>
    </p>
</p>

<p align="center">
<a href="https://github.com/RadKod/v-dropdown-menu" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/RadKod/v-dropdown-menu?style=social"></a>
</p>

<p align="center">
  <a href="https://v-dropdown-menu.vercel.app" target="_blank">Website</a>
</p>

<div align="center">
<sub>Buy me a coffee - <a href="https://www.buymeacoffee.com/RadKod">Sponsorship 💖</a></sub><br>
</div>

## Features
- ⚡️ Lightweight
- 🎨 Interactive
- 🛠️ Customizable
- 👶🏻 Easy implementation
- 📦 Vue2 & Vue3 support
- 💉 SSR compatible

## Getting Started

### Try it Online ⚡️

[DEMO](https://v-dropdown-menu.vercel.app/demo)


## Installation

```js
yarn add v-dropdown-menu  # or npm i v-dropdown-menu
```

### Vue3

#### Global Register

```js
import { createApp } from 'vue'
import App from './App.vue'
import DropdownMenu from 'v-dropdown-menu'

const app = createApp(App)

app.use(DropdownMenu)
app.mount('#app')
```

#### Local Register
```html
<script setup>
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/dist/vue3/v-dropdown-menu.css'
</script>
```
#### Via CDN
```js
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/v-dropdown-menu"></script>
<link rel="stylesheet" href="https://unpkg.com/v-dropdown-menu/dist/vue3/v-dropdown-menu.css">

<script>
  const app = Vue.createApp({})
    
  app.use(DropdownMenu)
  app.mount('#app')
</script>
```

### Vue2

#### Global Register

```js
import Vue from "vue"
import DropdownMenu from "v-dropdown-menu/vue2"

Vue.use(DropdownMenu);
```

#### Local Register
```js
import DropdownMenu from "v-dropdown-menu/vue2"
import "v-dropdown-menu/dist/vue2/v-dropdown-menu.css"

export default {
  components: {
    DropdownMenu
  }
}
```
#### Via CDN
```js
<script src="https://unpkg.com/vue@2"></script>
<script src="https://unpkg.com/v-dropdown-menu/vue2"></script>
<link rel="stylesheet" href="https://unpkg.com/v-dropdown-menu/dist/vue2/v-dropdown-menu.css">

<script>
new  Vue({
  el: "#app"
});

Vue.use(DropdownMenu);
</script>
```
&nbsp;

### Usage

```html
<dropdown-menu>
  <template #trigger>
    <button>Open Dropdown</button>
  </template>
  
  <template #header> Dropdown Header </template>
  
  <template #body>
    <ul>
      <li v-for="i in 6" :key="i">
        <a href="">Item {{ i }}</a>
      </li>
    </ul>
  </template>
  
  <template #footer> Dropdown Footer </template>
</dropdown-menu>

```

#### Props
| Name | Description | Type| Options| Default |
|--|--|--|--|--|
|isOpen|Show or hide for dropdown|Boolean|`true` , `false` | false
|mode|Open variant|String|`click` , `hover` | click
| dropup |Open the menu upwards | Boolean | `true` , `false` | false
|direction|Menu container direction|String|`left` , `right` , `center` | left
|closeOnClickOutside|closes dropdown menu when click outside|Booelan|`true` , `false` | true
|withDropdownCloser|  If there is an element in the menu with **dropdown-closer** attribute, clicking on it closes the menu.|Boolean|`true` , `false` | false
|containerZIndex|z-index of menu container|String| .| 994
|overlay|background overlay of dropdown menu (only for click mode) |Boolean| `true` , `false`| true
|overlayBgColor|background-color of overlay |String| ex: `rgba(1, 35, 83, 0.8)`| rgba(0, 0, 0, 0.2)
|overlayZIndex|z-index of overlay|String| .| 992
|transition|custom vue transition for menu|String| .| default

#### Slots
|Name| Description |
|--|--|
|trigger|trigger for dropdown menu |
|header|header of menu container (optional)|
|body|content of menu (optional)|
|footer|footer of menu container (optional)|

#### Events (only for click mode)
|  |
|--|
| `@opened="dispatchEvent"`|
| `@closed="dispatchEvent"`|


---

## Development

### Vue3

```bash
yarn build:vue3 # build for vue3
```

```bash
# Serve

cd dev/vue3

yarn install
yarn serve
```

### Vue2

```bash
yarn build:vue2 # build for vue2
```

```bash
# Serve

cd dev/vue2

yarn install
yarn serve
```

### Vue 2&3

```bash
yarn build # build for vue2 and vue3
```

#### Linter

```bash
# run eslint
yarn lint:eslint

# run eslint fix
yarn lint:eslint:fix

# run stylelint
yarn lint:stylelint

# run stylelint fix
yarn lint:stylelint:fix

# run prettier
yarn prettier

```

## Sponsorship

You can sponsor us for the continuity of our projects:

<p align="left">
  <a href="https://buymeacoffee.com/RadKod">
    <img src='https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png'/>
  </a>
</p>

## License

[MIT License](./LICENSE)

Copyright (c) RadKod <info@radkod.com>

<p align="left">
  <a href="https://radkod.com">
    <img src='/meta/radkod_signature.png'/>
  </a>
</p>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/v-dropdown-menu/latest.svg
[npm-version-href]: https://npmjs.com/package/v-dropdown-menu

[npm-downloads-src]: https://img.shields.io/npm/dt/v-dropdown-menu.svg
[npm-downloads-href]: https://npmjs.com/package/v-dropdown-menu

[codecov-src]: https://img.shields.io/codecov/c/github/RadKod/v-dropdown-menu.svg
[codecov-href]: https://codecov.io/gh/RadKod/v-dropdown-menu

[changelog-src]: https://img.shields.io/static/v1?label=%F0%9F%93%96&message=Release%20Notes%20|%20CHANGELOG&color=blue
[changelog-href]: ./CHANGELOG.md

[license-src]: https://img.shields.io/badge/License-MIT-blue.svg
[license-href]: https://npmjs.com/package/v-dropdown-menu/LICENSE
