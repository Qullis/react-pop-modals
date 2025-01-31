
# React-Pop-Modals
Easy to use popup modals for react, based on Bootstrap Modal. 

This project started when I was making a reusable form modal for my own website, and suddenly it was it's own project. The form modal is built on react-hook-form and features form validation with Yup. All modals use bootstraps css and js, but the css is scoped so it should not interfere with a project that does not use it. Currently implemented modals are Form, Confirm and Info modals.
Modals are called with code only, no component needed. See further below for a complete documentation for each modal.



## Installation

```bash
  -npm install react-modals-
  //not yet published to npm, todo soon
```
    
## Example usage

```javascript
import useReactModals from "react-modals"
import { myYupSchema } from "./myOptionalYupSchema";

const postFields = [
        { name: 'postTitle', label: 'Post title', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'numberOfbirds', label: 'Number of birds sighted', type: 'text' },
        { name: 'descriptionOfBirds', label: 'Short description of birds', type: 'textarea' }
    ];

function App() {
  const { showModal } = useReactModals();

  const submitFunction = async (formData) => {
        //do something with the data
    };

  const handleClick = () => {
    showModal({
            type: 'form',
            modalHeader: 'Add new bird sighting',
            fields: postFields,
            schema: myYupSchema,
            callback: submitFunction,
            theme: 'light',
            buttonText: {
                actionButton: 'Submit',
                closeButton: 'Cancel'
            },
        });
  };

  return (
    <>
      <h1>Bird sightings log</h1>
      <hr />
      <button onClick={handleClick} >Add new</button>
    <>
  )
}
```


## Reference

### useReactModals

```javascript
  import {useReactModals} from "react-modals"
  const { showModal, createStoredModal, showStoredModal } = useReactModals(options);
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `options` | `object` | **Optional**. See below |

#### Options

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `useValidation`| `object` | `boolean` | Validates the modalProperties passed to a modal, useful in developement but should be set to false in production, as to not affect performance. Defaults to true.|

#### Return values

| Value | Description                
| :-------- | :------- | 
| `showModal` | Shows a modal based on the type passed in the modalProperties.  |
| `createStoredModal` | Creates a stored modal that can be used in different components/pages.  |
| `showStoredModal` | Used to show a stored modal based on the id passed.  |

### showModal
The showModal and createStoredModal functions both takes a modalProperties object. To choose a modal type you set the "type" in modalProperties.
Below are all types and their properties.

#### Type: form

#### modalProperties

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required.** Can be "form", "confirm" or "info"|
| `modalHeader`      | `string` | **Optional.** The header of the modal, can be left out.|
| `fields` | `array` | **Required.** Array of objects. Used to define the form input fields. See further down for reference on fields."|
| `schema`| `yupschema` | **Optional.** Yup validation schema, must match the fields of the form" |
| `callback`      | `function` | **Required.** The function that is run when the form is submitted. The formdata will be passed to this function."|
| `theme`      | `string` | **Optional.** 'light' or 'dark'. Defaults to light."|
| `buttonText`      | `object` | **Required.** { closeButton: 'text for close button', actionButton: 'text for submit button' }|
| `style` | `object` | **Optional.** Object with string values. Used to override the styling See further below"|
| `formDefaultData` | `object` | **Optional.** The default data for the form input fields. The key names of the object should match the field names in the fields objects. See below for reference on "fields". Note that for a stored modal, if you need to pass in default data dynamically, this is done in the "showStoredModal" call. See reference on stored modal for more information.|

#### Type: confirm

#### modalProperties

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required.** Can be "form", "confirm" or "info"|
| `modalHeader`      | `string` | **Optional.** The header of the modal, can be left out.|
| `callback`      | `function` | **Required.** The function that is run when the confirm button is clicked.|
| `bodyText`      | `string` | **Optional.** The text displayed in the body of the modal. Optional, but should propably be provided.|
| `theme`      | `string` | **Optional.** 'light' or 'dark'. Defaults to light."|
| `buttonText`      | `object` | **Required.** { closeButton: 'text for close button', actionButton: 'text for confirm button' }|
| `style` | `object` | **Optional.** Object with string values. Used to override the styling See further below|

#### Type: info

#### modalProperties

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `string` | **Required.** Can be "form", "confirm" or "info"|
| `modalHeader`      | `string` | **Optional.** The header of the modal, can be left out.|
| `bodyText`      | `string` | **Optional.** The text displayed in the body of the modal. Optional, but should propably be provided.|
| `theme`      | `string` | **Optional.** 'light' or 'dark'. Defaults to light."|
| `buttonText`      | `object` | **Required.** { closeButton: 'text for close button'}|
| `style` | `object` | **Optional.** Object with string values. Used to override the styling See further below"|



### createStoredModal
The showModal and createStoredModal functions both takes a modalProperties object. For stored modals you also need to provide a unique 
id. This id will be used to call the modal later. If the id is not unique when creating the modal, the create call will be ignored.

#### modalProperties
As stated above, all properties are the same as showModal, except for the id.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `modalId`      | `string` | **Required.** Must be unique.|



### showStoredModal
Used to display a modal that has previously been stored.

#### parameters

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required.** The id of the modal you want to display.|
| `options` | `object` | **Optional**. See below |

#### options

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formDefaultData` | `object` | **Optional.** The default data for the form input fields. The key names of the object should match the field names in the fields objects. If the data has changed, or is fetched dynamically after the modal has been created, you can use the formDefaultData in showStoredModal.|
| `callbackArgs` | `any` | **Optional.** If you need to pass some new data or parameters to the callback function after the modal has been stored but before it is shown, you can do it here. callbackArgs will be passed to your callback function. |



### Fields 


The fields parameter describes the form in the modal. 

```javascript	
const postFields = [
        { name: 'postTitle', label: 'Post title', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'numberOfbirds', label: 'Number of birds sighted', type: 'text' },
        { name: 'descriptionOfBirds', label: 'Short description of birds', type: 'textarea' }
    ];
```
In the example above, we define 4 html input fields. The name needs to be unique, as it serves as the id. The label is the descriptive text that is displayed. Type is the type of the html input field. Also supports textarea.


### Custom styling 

As of right now, you can apply some custom styling to a modal if you need. You do this by setting the style parameter when showing or creating a modal. Below you can see the default styling classes that you can override. Do note that not all of the styling is available for customization as that could break the modal.

```javascript
{
  modal: 'bg-dark text-white',
  closeButton: 'btn btn-light',
  actionButton: 'btn btn-light',
  xButton: 'bg-light'
}
```
These are the same for all modal, except for info modals that lack an "action" button. Setting the "modal" class will affect the whole modal, "closeButton" and "actionButton" will affect the respective buttons, and "xbutton" will affect the close button in the top right corner of the modal. You can either use Bootstrap classes or your own custom styles. If you for example want to set the actionButton to a red button with bootstrap, you would do:

```javascript
{
  actionButton: 'btn btn-danger'
}
``` 
More styling might be made available for customization in the future, such as separate styling for the modal header.