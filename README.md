
# React Modals
Easy to use popup modals for react, based on Bootstrap Modal.



## Installation

```bash
  npm install react-modals
```
    
## Usage

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

