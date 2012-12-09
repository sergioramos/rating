# rating

rating widget

## install

```bash
$ component install ramitos/rating
```

## example

```js
var rating = require('rating');

rating(function (el) {
  document.getElementById('rating').appendChild(el)
});
```

## api

#### rating(callback)

`callback` arguments:
 * DOMElement

returns a new rating instance

#### instance()

returns the current rating number

#### instance.disable()

#### instance.enable()