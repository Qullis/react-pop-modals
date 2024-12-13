import { typeChecker } from "../utils/utils";

const confirmSchema = {
    modalHeader: {//string
        optional: true,
        validator: value => typeChecker(value) === 'string',
        message: '"modalHeader" is invalid. Must be a string.',
    },
    buttonText: {
        optional: false,
        validator: value => typeChecker(value) === 'object' && Object.keys(value).every(key => typeChecker(value[key]) === 'string'),
        message: '"buttons" is invalid. Must be an object with string properties.: {submit: string close: string}'
    },
    bodyText: {
        optional: true,
        validator: value => typeChecker(value) === 'string',
        message: '"bodyText" is invalid. Must be a string.'
    },
    callback: {
        optional: false,
        validator: value => typeChecker(value) === 'function' || typeChecker(value) === 'asyncfunction',
        message: '"callback" is invalid. Must be a function that accepts the formdata as an input.'
    },
    callbackArgs: {
        optional: true,
        validator: value => true, //callback args is completely up to the user
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

export default confirmSchema;