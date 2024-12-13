import { typeChecker } from "../utils/utils";


const formSchema = {
    modalHeader: {//string
        optional: true,
        validator: value => typeChecker(value) === 'string',
        message: '"modalHeader" is invalid. Must be a string.',
    },
    fields: {//array of objects containing field names and values
        optional: false,
        validator: value => typeChecker(value) === 'array' && typeChecker(value[0]) === 'object', //TODO: validate all array elements as objects, and validate all properties of all objects, example: 'name' must be unique
        message: '"fields" is invalid. Must be an array of objects, with each object like this: { name: string-unique, label: string, type: string }' 
    },
    buttonText: {
        optional: false,
        validator: value => typeChecker(value) === 'object' && Object.keys(value).every(key => typeChecker(value[key]) === 'string'),
        message: '"buttons" is invalid. Must be an object with string properties.: {submit: string close: string}'
    },
    callback: {
        optional: false,
        validator: value => typeChecker(value) === 'function' || typeChecker(value) === 'asyncfunction',
        message: '"callback" is invalid. Must be a function that accepts the formdata as an input.'
    },
    theme: {
        optional: true,
        validator: value => typeChecker(value) ==='string' && ['dark', 'light'].includes(value),
        message: '"theme" is invalid. Use "dark" or "light".'
    },
    style: {
        optional: true,
        validator: value => typeChecker(value) === 'object' && Object.keys(value).every(key => typeChecker(value[key]) ==='string'),
        message: 'Invalid modal style. Must be an object with string properties. See documentation for creating custom styles'
    }
};

export default formSchema;