# custom-element-converter

convert custom yootheme-pro elements to the new format.

install `npm install yootheme/custom-element-converter -g`

cli usage `custom-element-converter your-element-file.js`

[this example](https://github.com/yootheme/example-element/blob/0a96a14fa01f7f2839866d401a89d60351b88212/example-element.js) input will yield two json files name `example_element.json` ans `example_element_item.json`


api usage
```js
const {convertElement} = require('custom-element-converter');
const elements = convertElement(yourElementDefinitionsAsAString);
```