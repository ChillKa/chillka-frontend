'use client';

import { uploadActivity, uploadImage } from '@action/upload';
import { Button } from '@components/ui/button';
import { Form } from '@components/ui/form';
import { Separator } from '@components/ui/separator';
import { H2, H3 } from '@components/ui/typography';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { createActivityFormSchema } from '@lib/definitions';
import cn from '@lib/utils';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import OrganizerFormSection from './fields/OrganizerFormSection';
/* TODO: Fix typo ActivityTimePicker */
import ActivityContentFormSection from './fields/ActivityContentFormSection';
import TicketFormSection from './fields/TicketFormSection';
import UploadFormButton from './ui/UploadFormButton';

type ActivityCreationFormProps = {
  className: string;
};

const initialState = {
  message: '',
  imageUrl: '',
};

const ActivityCreationForm = ({ className }: ActivityCreationFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [formState, formAction] = useFormState(uploadImage, initialState);
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: 'chillka 溫馨小提醒',
      description: `${formState?.imageUrl}`,
    });
  }, [formState.message]);

  // const defaultValues: { file: null | File } = {
  //   file: null,
  // };

  // const methods = useForm({
  //   defaultValues,
  //   shouldFocusError: true,
  //   shouldUnregister: false,
  //   shouldUseNativeValidation: false,
  // });

  /* TODO: Image Drop Zone */

  // function handleOnDrop(acceptedFiles: FileList | null) {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     const allowedTypes = [
  //       { name: 'csv', types: ['text/csv'] },
  //       {
  //         name: 'excel',
  //         types: [
  //           'application/vnd.ms-excel',
  //           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //         ],
  //       },
  //     ];
  //     const fileType = allowedTypes.find((allowedType) =>
  //       allowedType.types.find((type) => type === acceptedFiles[0].type)
  //     );
  //     if (!fileType) {
  //       methods.setValue('file', null);
  //       methods.setError('file', {
  //         message: 'File type is not valid',
  //         type: 'typeError',
  //       });
  //     } else {
  //       methods.setValue('file', acceptedFiles[0]);
  //       methods.clearErrors('file');
  //     }
  //   } else {
  //     methods.setValue('file', null);
  //     methods.setError('file', {
  //       message: 'File is required',
  //       type: 'typeError',
  //     });
  //   }
  // }

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
          `File uploaded successfully! And image url: ${result.imageUrl}`
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

  const form = useForm<z.output<typeof createActivityFormSchema>>({
    mode: 'all',
    resolver: zodResolver(createActivityFormSchema),
    defaultValues: {
      name: '',
      organizer: {
        profilePicture: '',
        name: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        websiteName: '',
        websiteURL: '',
      },
      cover: [''],
      thumbnail: '',
      startDateTime: undefined,
      fromToday: false,
      endDateTime: undefined,
      noEndDate: false,
      category: '',
      type: '',
      link: '',
      location: '',
      address: '',
      summary: '',
      details: '',
      isPrivate: false,
      displayRemainingTickets: false,
      isRecurring: false,
      recurring: {
        period: '',
        week: '',
        day: '',
      },
      status: '',
      tickets: [
        {
          _id: '',
          name: '',
          price: 0,
          startDateTime: undefined,
          fromToday: false,
          endDateTime: undefined,
          noEndDate: false,
          participantCapacity: 0,
          unlimitedQuantity: false,
          purchaseLimit: 0,
          description: '',
          purchaseDuplicate: false,
          ticketStatus: '',
          serialNumber: '',
        },
      ],
    },
  });

  return (
    <section className={cn('', className)}>
      <Form {...form}>
        <form className="mt-12 space-y-12" action={uploadActivity}>
          <OrganizerFormSection form={form} />
          <ActivityContentFormSection form={form} />
          <TicketFormSection form={form} />
          <UploadFormButton>送出</UploadFormButton>
        </form>
      </Form>

      <Separator className="mt-24" />
      <H2>以下為測試區</H2>
      <Separator className="mt-24" />
      {/* Testing Area */}
      <form className="space-y-6" action={formAction}>
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
        <UploadFormButton>Image Upload</UploadFormButton>
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
