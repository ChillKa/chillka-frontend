'use client';

import { uploadImage } from '@action/upload';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';
import { useState } from 'react';

type ActivityCreationFormProps = {
  className: string;
};

const ActivityCreationForm = ({ className }: ActivityCreationFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // this function is build for route handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      if (result.imageUrl) {
        setSuccess(
          `File uploaded successfully! And image url:  ${result.imageUrl}`
        );
      } else {
        setSuccess(`File uploaded successfully! But something else happen`);
      }
      console.log('File uploaded successfully:', result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className={cn('', className)}>
      {/* */}
      <form className="space-y-6" action={uploadImage}>
        <H3 className="text-primary">Server actions Method</H3>
        <h2>Upload and Display Image</h2>
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
      <Separator className="my-4" />
      {/* route handlers  */}
      <form onSubmit={handleSubmit} className="my-4 space-y-2">
        <H3 className="text-primary">Route Handler Method</H3>
        <input type="file" name="uploadImage" className="block" />
        <Button type="submit" disabled={uploading} className="inline-flex">
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </section>
  );
};

export default ActivityCreationForm;
