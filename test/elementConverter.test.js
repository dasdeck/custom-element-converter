/* eslint-env jest */

const {convertElement} = require('../src');
const fs = require('fs');
const {forEach} = require('lodash');

describe('elementConverter', () => {

    it('check locked conversions', () => {

        const types = convertElement(fs.readFileSync(__dirname + '/exampleElement.js'));

        forEach(types, type => {
            expect(type).toEqual(require(`./${type.name}.json`));

        });

    });

    it('get icons', () => {

        const types = convertElement(fs.readFileSync(__dirname + '/exampleElement.js'));

        expect(types.example_element.icon).toEqual('{+$theme}_child/builder/example-element/icon.svg');
        expect(types.example_element.iconSmall).toEqual('{+$theme}_child/builder/example-element/icon-small.svg');

    });

    it('parse legacy config file', () => {

        const types = convertElement(`
        Builder.types.example_element = {

            title: 'Example Element'
        };
        `);

        expect(types.example_element.title).toEqual('Example Element');

    });

    it('get defaults', () => {

        const types = convertElement(`
        Builder.types.example_element = {

            // Label in the interface
            data: function () {
                return {
                    props: {
                        field1: 'default_value1'
                    }
                }
            }
        };
        `);

        expect(types.example_element.defaults.field1).toEqual('default_value1');

    });

    it('get params from elements', () => {

        const types = convertElement(`
        Builder.types.example_element = {

            // Label in the interface
            params: function (params) {
                const element = params.element;
                return {
                    fields: {
                        name: element.name
                    }
                }
            }
        };
        `);

        expect(types.example_element.fields.name).toEqual('${NAME}');

    });

    it('sort members', () => {

        const types = convertElement(`
        Builder.types.example_element = {

            // Label in the interface
            params: function (params) {
                const element = params.element;
                return {
                    fields: {
                        name: {
                            type: 'test',
                            label: 'Test'
                        }
                    }
                }
            }
        };
        `);

        expect(JSON.stringify(types.example_element.fields.name))
        .toEqual(JSON.stringify({label: 'Test', type: 'test'}));

    });

    it('collect mixin', () => {

        const types = convertElement(`
        Builder.types.example_element = {
            element: true,
            mixins: [Builder.element, Builder.container, Builder.entity]

        };
        `);

        expect(types.example_element)
        .toEqual({
            name: 'example_element',
            container: true,
            element: true
        });

    });

    it('convert show/enable functions', () => {

        const types = convertElement(`

        Builder.types.example_element = {

            params() {
                return {
                    fields: {
                        field1: {
                            name: 'test',
                            enable: ({show_image, image_align}) => show_image && (image_align == 'left' || image_align == 'right')
                        }

                    }
                }
            }

        };
        `);

        expect(types.example_element.fields.field1).toEqual({
            name: 'test',
            enable: "show_image && (image_align == 'left' || image_align == 'right')"
        })

    });

    it('raw replace', () => {
        const types = convertElement(`
        Builder.types.example_element = {

            params() {
                return {
                    fields: [{
                        name: '{+$builder}/row/assets/images/'
                    }]
                }
            }

        };
        `);

        expect(types.example_element.fields[0].name).toBe('$ASSETS/images/row/');
    });

    it('unwrap tabs', () => {

        const types = convertElement(`
        Builder.types.example_element = {

            // Label in the interface
            params: function (params) {
                const element = params.element;
                return {
                    tabs: [
                        {
                            title: 'Tab1',
                            fields: {
                                field1: {
                                    name: 'field1'
                                }
                            }
                        },
                        {
                            title: 'Tab2',
                            fields: {
                                field2: {
                                    name: 'field2'
                                }
                            }
                        }
                    ]
                }
            }
        };
        `);

        expect(types.example_element).toEqual({
            name: 'example_element',
            fields: {
                field1: {name: 'field1'},
                field2: {name: 'field2'}
            },
            fieldset: {
                default: {
                    type: 'tabs',
                    fields: [
                        {
                            title: 'Tab1',
                            fields: ['field1']
                        },
                        {
                            title: 'Tab2',
                            fields: ['field2']
                        }
                     ]
                }
            }
        });

    });

});
