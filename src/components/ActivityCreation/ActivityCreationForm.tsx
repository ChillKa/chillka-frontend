'use client';

import { FormState, uploadActivity } from '@action/upload';
import { Form } from '@components/ui/form';
import { useToast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { createActivityFormSchema } from '@lib/definitions';
import cn from '@lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { FieldPath, useForm } from 'react-hook-form';
import { z } from 'zod';
import UploadFormButton from './fields/UploadFormButton';
import ActivityContentFormSection from './sections/ActivityContentFormSection';
import OrganizerFormSection from './sections/OrganizerFormSection';
import TicketFormSection from './sections/TicketFormSection';

type ActivityCreationFormProps = {
  className: string;
};
export interface FormValues {
  name: string;
  lastName: string;
}

const ActivityCreationForm = ({ className }: ActivityCreationFormProps) => {
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [formState, formAction] = useFormState<FormState, FormData>(
    uploadActivity,
    { message: '' }
  );
  const { toast } = useToast();
  const router = useRouter();

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
        period: '每週',
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
          participantCapacity: 1,
          unlimitedQuantity: false,
          purchaseLimit: 1,
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
      form.clearErrors();
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
    if (formState?.activityId) {
      router.push(`/activity/${formState.activityId}`);
    }
  }, [formState?.issues, formState?.message, form, toast]);

  return (
    <section className={cn('', className)}>
      <Form {...form}>
        <form className="mt-12 space-y-12 px-3 xl:px-0" action={formAction}>
          <OrganizerFormSection form={form} onImageUploading={setUploadCount} />
          <ActivityContentFormSection
            form={form}
            onImageUploading={setUploadCount}
          />
          <TicketFormSection form={form} />
          <UploadFormButton uploadCount={uploadCount}>送出</UploadFormButton>
        </form>
      </Form>
    </section>
  );
};

export default ActivityCreationForm;
