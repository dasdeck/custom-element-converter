const {convertElement} = require ('.');
const fs = require('fs');
const path = require('path');
const {forEach} = require('lodash');

let file = process.argv[2];

if (!path.isAbsolute(file)) {
    file = path.join(process.cwd(), file);
}

const source = fs.readFileSync(file, 'utf8');

const elements = convertElement(source);

forEach(elements, (el, name) => {
    fs.writeFileSync(path.join(process.cwd(), `${name}.json`), JSON.stringify(el, null, 2));
});
