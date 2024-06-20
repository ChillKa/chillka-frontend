'use client';

import { uploadActivity, uploadImage } from '@action/upload';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Separator } from '@components/ui/separator';
import { Switch } from '@components/ui/switch';
import { H2, H3, H4, P, Subtle } from '@components/ui/typography';
import { useToast } from '@components/ui/use-toast';
import cn from '@lib/utils';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import ActivityTimePicker from './ui/AcitivityTimePicker';
import ActivityDatePicker from './ui/ActivityDatePicker';
import RichTextEditor from './ui/RichTextEditor';
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

  return (
    <section className={cn('', className)}>
      <form className="mt-12 space-y-12" action={uploadActivity}>
        <div className="space-y-6">
          <H2>封面與縮圖</H2>
          <H4>活動封面</H4>
          <P>
            請上傳至少一張清晰、有吸引力的活動封面圖片，以展示您的活動（最多四張）。
            <br />
            建議尺寸為 1920*1080px，檔案大小不超過 4MB
          </P>
          <Button variant="form" type="submit">
            上傳活動封面
          </Button>
          <Separator className="h-0.5 w-12" />
          <H4>活動縮圖</H4>
          <P>
            請上傳一張活動縮圖，將用於活動列表頁面等位置。 建議尺寸為
            <br />
            500*500px，檔案大小不超過 2MB
          </P>
          <Button variant="form" type="submit">
            上傳活動縮圖
          </Button>
        </div>
        <Separator className="h-[0.5px]" />
        <div className="max-w-[26rem] space-y-6">
          <H2>基本資料</H2>
          <div className="space-y-1.5">
            <Label htmlFor="">活動名稱</Label>
            <Input name="name" variant="form" placeholder="請輸入活動名稱" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="">活動類型</Label>
            <Input
              name="category"
              variant="form"
              placeholder="請輸入活動名稱"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="">開始</Label>
            <div className="flex gap-2">
              <ActivityDatePicker />
              <ActivityTimePicker />
            </div>
            <div className="flex gap-2">
              <Checkbox variant="form" />
              <Label>即日起</Label>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="">結束</Label>
            <div className="flex items-center gap-2">
              <ActivityDatePicker />
              <ActivityTimePicker />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox variant="form" />
              <Label>無截止日</Label>
            </div>
          </div>
        </div>
        <Separator className="h-[0.5px]" />
        <div className="space-y-6">
          <H2>活動地點</H2>
          <div className="space-y-1.5">
            <Label>活動形式</Label>
            <RadioGroup defaultValue="online" className="flex">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  variant="form"
                  name="online"
                  value="online"
                  id="r1"
                />
                <Label htmlFor="r1">線上活動</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  variant="form"
                  name="offline"
                  value="offline"
                  id="r2"
                />
                <Label htmlFor="r2">線下活動</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Separator className="h-[0.5px]" />
        <div className="space-y-6">
          <H2>摘要及說明</H2>
          <div className="w-[26rem] space-y-1.5">
            <Label>活動摘要</Label>
            <Input name="summary" variant="form" placeholder="請輸入活動名稱" />
            <Subtle className="text-primary-light">
              顯示於首頁活動簡介、活動列表頁面等位置
            </Subtle>
          </div>
          <div className="space-y-1.5">
            <Label>活動說明</Label>
            <RichTextEditor />
          </div>
        </div>
        <Separator className="h-[0.5px]" />
        <div className="space-y-6">
          <H2>進階設定</H2>
          <div className="space-y-1.5">
            <Label>活動隱私</Label>
            <RadioGroup name="isPrivate" defaultValue="public" className="flex">
              <div className="flex items-center gap-2">
                <RadioGroupItem variant="form" value="public" id="r3" />
                <Label htmlFor="r3">公開</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem variant="form" value="private" id="r4" />
                <Label htmlFor="r4">線下活動</Label>
              </div>
            </RadioGroup>
            <Subtle className="text-primary-light">
              設定活動為私人時，將不會在平台上顯示
            </Subtle>
          </div>
          <div className="space-y-1.5">
            <Label>剩餘票券/名額顯示</Label>
            <RadioGroup name="isOnline" defaultValue="public" className="flex">
              <div className="flex items-center gap-2">
                <RadioGroupItem variant="form" value="public" id="r5" />
                <Label htmlFor="r6">顯示</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem variant="form" value="private" id="r4" />
                <Label htmlFor="r4">不顯示</Label>
              </div>
            </RadioGroup>
            <Subtle className="text-primary-light">
              是否在活動頁面上顯示剩餘票券數量或可報名名額的資訊
            </Subtle>
          </div>
          <div className="space-y-1.5">
            <Label>連續活動週期</Label>
            <div className="flex items-center gap-2">
              <Switch className="bg-white" id="airplane-mode" />
              <Label htmlFor="airplane-mode">不啟用</Label>
            </div>
            <Subtle className="text-primary-light">
              啟用週期設定將使活動固定舉辦
            </Subtle>
          </div>
        </div>
        <div>
          {/* <Dropzone
            dropMessage="Drop files or click here"
            handleOnDrop={handleOnDrop}
          /> */}
        </div>
        <UploadFormButton>下一步</UploadFormButton>
      </form>
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
