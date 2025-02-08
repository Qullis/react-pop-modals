
# React-Pop-Modals
Easy to use popup modals for react, based on Bootstrap Modal. 

All modals use Bootstraps CSS and Js, but the CSS is scoped so it should not interfere with a project that does not use it. Modals are easily called with JavaScript, you dont need to place any components. 

If there is any interest in this package, and a need in the future, there might be a separate package that is not shipped with standalone Bootstrap for use if you already have it. For now, if size is important, you can go into the package and manually replace the scoped-bootstrap.css file with an empty one. (react-pop-modals/source/lib/bootstrap-5.3.3/css/scoped-bootstrap.css)

Also please report any bugs/issues at https://github.com/Qullis/react-pop-modals

More usage examples will be added soon.

![modal example](https://github.com/Qullis/react-pop-modals/blob/media/ModalForm.png?raw=true)

### Modal types:
  -Form, uses react-hook-form and features optional form validation with Yup https://www.npmjs.com/package/yup.

  -Info, simple modal for displaying information

  -Confirm, modal for getting confirmation from the user

More types might be added in the future.

## Installation

```bash
  npm install react-pop-modals
```
    
## Example usage

```javascript
import {useReactPopModals} from "react-pop-modals"
import { myYupSchema } from "./myOptionalYupSchema";

const postFields = [
    { name: 'postTitle', label: 'Post title', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'numberOfbirds', label: 'Number of birds sighted', type: 'number' },
    { name: 'descriptionOfBirds', label: 'Short description of birds', type: 'textarea' }
];

const App = () => {
    const { showModal } = useReactPopModals();

    const submitFunction = async (formData) => {
        //do something with the data
        console.log(formData);
    };

    const handleClick = () => {
        showModal({
            type: 'form',
            modalHeader: 'Add new bird sighting',
            fields: postFields,
            schema: myYupSchema, // optional Yup schema for validation
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
        </>
    );
};

export default App;
```


## Reference


## Importing and setup

```javascript
  import {useReactPopModals} from "react-modals"
  const { showModal, createStoredModal, showStoredModal } = useReactPopModals(options);
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `options` | `object` | **Optional**. See below |

#### Options

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `useValidation`| `boolean` | Validates the modalProperties passed to a modal, useful in developement but should be set to false in production, as to not affect performance. Defaults to false.|

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
| `style` | `object` | **Optional.** Object with string values. Used to override the styling See further below|
| `formDefaultData` | `object` | **Optional.** The default data for the form input fields. The key names of the object should match the field names in the fields objects. See below for reference on "fields". Note that for a stored modal,  this is passed in the "showStoredModal" call. See reference on stored modal for more information.|
| `hideIdField`      | `boolean` | **Optional.** When you have an input field with name "id" and pass in default data the field is hidden by default, if you want the field to be visible set this to true. Defaults to false. |

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



## createStoredModal
The showModal and createStoredModal functions both takes a modalProperties object. For stored modals you also need to provide a unique 
id. This id will be used to call the modal later. If the id is not unique when creating the modal, the create call will be ignored.

#### modalProperties
All properties are the same as for showModal, with two exeptions. First, a stored modal requires a unique id to be provided in the modalProperties. Second, a stored modal does not take the "formDefaultData" property in the modalProperties - this is instead passed in the "showStoredModal" call. For more information see "showStoredModal" below.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `modalId`      | `string` | **Required.** Must be unique.|



## showStoredModal
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



## Fields 


The fields parameter describes the form in the modal.

```javascript	
const postFields = [
        { name: 'postTitle', label: 'Post title', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'numberOfbirds', label: 'Number of birds sighted', type: 'number' },
        { name: 'descriptionOfBirds', label: 'Short description of birds', type: 'textarea' }
    ];
```
In the example above, we define 4 html input fields. The name needs to be unique, as it serves as the id. The label is the descriptive text that is displayed. Type is the type of the html input field. 

#### Using formDefaultData

When you need to pass default data to the form modal, the key names for the objec passed needs to match the field names. Below is an example with default data for the above fields.

```javascript
const formDefaultData = {
  postTitle: 'New birds sighted',
  email: 'example@mail.com',
  numberOfbirds: 2,
  descriptionOfBirds: 'Winged, small, feathered. Have beaks. 2 legs each.'
}
```
### Supported input types

For normal input elements, the supported types are text, number, password, email, tel, date, url. Some other types might work as well, but styling might be off, for example color input. Support for more might be added later. For checkboxes and radio buttons see below.

Other than those there are a few other input methods available.

You can use textarea with the above model.

For types select, radio and checkbox, you can use the below model.

#### Select:

```javascript
{ name: 'category', label: 'Category', type: 'select', options: [
  { value: '', label: 'Select category' }, 
  { value: 'smallBird', label: 'Small bird' }, 
  { value: 'mediumBird', label: 'Medium bird' }, 
  { value: 'largeBird', label: 'Large bird' }
  ] },
```
Settign the value to '' will make the select option the default displayed on initial rendering.

#### Checks and radios:

```javascript
{ name: 'singleCheckBox', label: 'A checkbox', type: 'checkbox' },
{ name: 'inputCheck', label: 'Checkbox test', type: 'checkbox', value: 'CheckHello' },
{ name: 'inputCheck', label: 'Checkbox test 2', type: 'checkbox', value: 'CheckHello2' },
{ name: 'inputRadio', label: 'Radio test 1', type: 'radio', value: 'r1', topLabel: 'Choose a radio option' },
{ name: 'inputRadio', label: 'Radio test 2', type: 'radio', value: 'r2' },
```
The label will be shown to the right of the box, to have a label on top, for example above a group of radio buttons, use "topLabel". 
If you leave out "value" on a checkbox, it will give true or false.

If you need radio/checkboxes shown inline, you can use the following method:
```javascript
{ name: 'inputRadioInline', groupLabel: 'Radio inline group', type: 'radioInline', options: [
  { label: 'Radio inline 1', value: '1' }, 
  { label: 'Radio inline 2', value: '2' }
  ] }
```
This will only work if they are part of the same input/share id. Currently there is no support for radio/checkboxes with different ids to be shown inline.

#### Separator

If you need a way to organize/separate/divide the form, for example radio/checkboxes, you can use the following:
```javascript	
{ type: 'separator'},
```
This basically inserts a hr element into the form at the desired position.


## Custom styling 

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