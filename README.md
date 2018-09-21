# custom-element-converter

Migrate custom yootheme-pro elements.

## Install

`npm install yootheme/custom-element-converter -g`

## Usage

`custom-element-converter your-element-file.js`

Used on the old example element [example-element.js](https://github.com/yootheme/example-element/blob/0a96a14fa01f7f2839866d401a89d60351b88212/example-element.js), the script would yield two json files named after the used element names [example_element.json](https://github.com/yootheme/example-element/blob/14facb382cefdddf69d6bfa57715a604f7aff305/example_element.json) and [example_element_item.json](https://github.com/yootheme/example-element/blob/14facb382cefdddf69d6bfa57715a604f7aff305/example_element_item.json) in your current working directory

## Api

```js
const {convertElement} = require('custom-element-converter');
const elements = convertElement(yourElementDefinitionsAsAString);
```