
[![v-dropdown-menu](https://raw.githubusercontent.com/RadKod/v-dropdown-menu/master/preview_assets/v-dropdown-menu-logo.png)](https://www.npmjs.com/package/v-dropdown-menu)

> Customizable dropdown menu plugin for vuejs. SSR supported.

![v-dropdown-menu](https://raw.githubusercontent.com/RadKod/v-dropdown-menu/master/preview_assets/v-dropdown-menu-preview.jpg)

 ✨ Demo:
   [https://v-dropdown-menu.now.sh](https://v-dropdown-menu.now.sh)
   
 🟥 NPM:
   [https://www.npmjs.com/package/v-dropdown-menu](https://www.npmjs.com/package/v-dropdown-menu)
   
  ⬛ Github:
   [https://github.com/RadKod/v-dropdown-menu](https://github.com/RadKod/v-dropdown-menu)

#### Installation
```bash
$ npm install v-dropdown-menu --save
```
#### Global Register
```js
    import Vue from 'vue'
    import DropdownMenu from 'v-dropdown-menu'
    import 'v-dropdown-menu/dist/v-dropdown-menu.css' // Base style, required.
    
    Vue.use(DropdownMenu)  
 ```
#### Local Register
```js
    import DropdownMenu from 'v-dropdown-menu'
    import 'v-dropdown-menu/dist/v-dropdown-menu.css' // Base style, required.
    
    export default {
      components: {
        DropdownMenu
      }
    }
```
#### Via CDN
```js
    <script src="https://unpkg.com/v-dropdown-menu"></script>
    <script>
	  new  Vue({
	    el: "#app"
	  });
	  Vue.use(DropdownMenu);
    </script>
```
 

#### Usage
```html
    <dropdown-menu>
      <button slot="trigger">Open Dropdown</button>
      <div slot="header">Dropdown Header</div>
      <ul slot="body">
        <li v-for="i in 6" :key="i"><a href="">Item {{i}}</a></li>
      </ul>
      <div slot="footer">Dropdown Footer</div>
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



## Author

👤 **selimdoyranli**

* Website: [@selimdoyranli](https://selimdoyranli.com)
* Github: [@selimdoyranli](https://github.com/selimdoyranli)
* LinkedIn: [@selimdoyranli](https://linkedin.com/in/selimdoyranli)
* Team: [@RadKod](https://radkod.com)

___

CREATED BY

 [![RadKod](https://i.ibb.co/q5G6N0n/radkod-mail-imza.png)](https://www.radkod.com)
