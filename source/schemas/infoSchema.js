import { typeChecker } from "../utils/utils";

const infoSchema = {
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

export default infoSchema;