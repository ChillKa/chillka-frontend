'use client';

import { uploadImage } from '@action/upload';
import { Button } from '@components/ui/button';
import { useState } from 'react';
import { useFormState } from 'react-dom';

const FormComponent = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [state, formAction] = useFormState(uploadImage, null);

  console.log(state);

  return (
    <>
      <form className="space-y-6" action={uploadImage}>
        <h1>Upload and Display Image</h1>
        <h3>using React Hooks</h3>

        {/* Conditionally render the selected image if it exists */}
        {selectedImage && (
          <div>
            {/* Display the selected image */}
            <img
              alt="not found"
              width="250px"
              src={URL.createObjectURL(selectedImage)}
            />
            <br /> <br />
            {/* Button to remove the selected image */}
            <button type="button" onClick={() => setSelectedImage(null)}>
              Remove
            </button>
          </div>
        )}

        <br />

        {/* Input element to select an image file */}
        <input
          type="file"
          name="uploadImage"
          // Event handler to capture file selection and update the state
          onChange={(event) => {
            if (event.target.files) {
              console.log(event.target.files[0]); // Log the selected file
              setSelectedImage(event.target.files[0]); // Update the state with the selected file
            }
          }}
        />
        <Button className="block" type="submit">
          Upload image
        </Button>
      </form>
      <form className="bg-slate-500" action={formAction}>
        {state}
      </form>
    </>
  );
};

export default FormComponent;
