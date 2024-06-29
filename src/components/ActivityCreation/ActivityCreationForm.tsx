'use client';

import { FormState, uploadActivity } from '@action/upload';
import { Form } from '@components/ui/form';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { createActivityFormSchema } from '@lib/definitions';
import cn from '@lib/utils';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FieldPath, useForm } from 'react-hook-form';
import { z } from 'zod';
import OrganizerFormSection from './sections/OrganizerFormSection';
/* TODO: Fix typo ActivityTimePicker */
import UploadFormButton from './fields/UploadFormButton';
import ActivityContentFormSection from './sections/ActivityContentFormSection';
import TicketFormSection from './sections/TicketFormSection';

type ActivityCreationFormProps = {
  className: string;
};
export interface FormValues {
  name: string;
  lastName: string;
}

// const initialState = {
//   message: '',
//   imageUrl: '',
// };

const ActivityCreationForm = ({ className }: ActivityCreationFormProps) => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [files, setFiles] = useState<FileList | null>(null);
  const [formState, formAction] = useFormState<FormState, FormData>(
    uploadActivity,
    { message: '' }
  );
  // const [imageFormState, imageFormAction] = useFormState(
  //   uploadImage,
  //   initialState
  // );
  const { toast } = useToast();

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
      type: '線上',
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
      lat: 121.5654,
      lng: 25.033,
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

  useEffect(() => {
    if (Array.isArray(formState?.issues)) {
      formState?.issues.forEach((err) => {
        form.setError(
          err.path as FieldPath<z.output<typeof createActivityFormSchema>>,
          {
            message: err.message,
          }
        );
      });
    }
    if (formState?.message) {
      toast({
        title: 'chillka 溫馨小提醒',
        description: `${formState?.message}`,
      });
    }
  }, [formState?.issues, formState?.message, form, toast]);

  // useEffect(() => {
  //   toast({
  //     title: 'chillka 溫馨小提醒',
  //     description: `${imageFormState?.imageUrl}`,
  //   });
  // }, [imageFormState.message, toast]);

  return (
    <section className={cn('', className)}>
      <Form {...form}>
        <form className="mt-12 space-y-12" action={formAction}>
          <OrganizerFormSection form={form} />
          <ActivityContentFormSection form={form} />
          <TicketFormSection form={form} />
          <UploadFormButton>送出</UploadFormButton>
        </form>
      </Form>

      {/* Testing Area */}

      {/* <Separator className="mt-24" />
      <H2>以下為測試區</H2>
      <Separator className="mt-24" />
      <form className="space-y-6" action={imageFormAction}>
        <H3 className="text-primary">Server actions Method</H3>
        <h2>Upload and Display Image</h2>
        <h3>using React Hooks</h3> */}

      {/* Conditionally render the selected image if it exists */}
      {/* {selectedImage && (
          <div>
            <img
              alt="not found"
              width="250px"
              src={URL.createObjectURL(selectedImage)}
            />
            <br /> <br />
            <button type="button" onClick={() => setSelectedImage(null)}>
              Remove
            </button>
          </div>
        )}

        <br />
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
      </form> */}
    </section>
  );
};

export default ActivityCreationForm;
