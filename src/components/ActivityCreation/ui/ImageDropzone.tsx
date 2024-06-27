import { uploadImage } from '@action/upload';
import { Button } from '@components/ui/button';
import { P } from '@components/ui/typography';
import { useToast } from '@components/ui/use-toast';
import { useControllableState } from '@hooks/use-controllable-state';
import cn, { formatBytes } from '@lib/utils';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { DropzoneState, useDropzone, type FileRejection } from 'react-dropzone';

export type ImageDropzoneProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: File[];
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>;
};

const isFileWithPreview = (file: File): file is File & { preview: string } => {
  return 'preview' in file && typeof file.preview === 'string';
};

export type FileCardProps = {
  file: File;
  onRemove: () => void;
  isUploading: boolean;
};

const FileCard = ({ file, isUploading, onRemove }: FileCardProps) => {
  return (
    <div className="flex items-center gap-x-4 ">
      {isFileWithPreview(file) ? (
        <div>
          <div className="group relative size-48">
            <Image
              src={file.preview}
              alt={file.name}
              fill
              loading="lazy"
              className={cn(
                'aspect-square rounded-[0.375rem] object-cover',
                `${isUploading ? ' opacity-50' : ''}`
              )}
            />
            {!isUploading && (
              <Button
                type="button"
                variant="form"
                size="icon"
                className="absolute right-0 top-0 size-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={onRemove}
              >
                <Trash2Icon className="size-6" aria-hidden="true" />
                <span className="sr-only">Remove file</span>
              </Button>
            )}
          </div>
          <p className="text-xs text-primary-light">{formatBytes(file.size)}</p>
        </div>
      ) : null}
    </div>
  );
};

const ImageDropzone = ({
  value: valueProp,
  onValueChange,
  maxSize = 1024 * 1024 * 2,
  maxFiles = 4,
  multiple = false,
  className,
}: ImageDropzoneProps) => {
  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [imageURLs, setImageURLs] = useState<Array<string>>([]);

  const upload = async (formData: FormData) => {
    const result = await uploadImage(formData);

    if (result.status === 'failed') {
      return result;
    }

    setImageURLs((prevImageURLs) => [
      ...prevImageURLs,
      result.data.imageUrls.toString(),
    ]);
    return { status: result.status, message: '圖片上傳成功' };
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast({ description: '無法一次上傳多個圖檔' });
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast({ description: `無法上傳超過 ${maxFiles} 個檔案` });
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          if (file.size > maxSize) {
            toast({
              description: `無法上傳超過 ${formatBytes(maxSize)} 的檔案`,
            });
            return;
          }
          toast({ description: `無法上傳 ${file.name} 檔案` });
        });
      }

      if (
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles &&
        newFiles.length > 0
      ) {
        const allPromises: Array<Promise<{ status: string; message: string }>> =
          [];
        newFiles.forEach((file) => {
          const formData = new FormData();
          formData.append('uploadImage', file);
          allPromises.push(upload(formData));
          setIsUploading(true);
        });
        Promise.all(allPromises).then((values) => {
          setIsUploading(false);
          const statusMsg = values.find(
            (element) => element.status === 'failed'
          );
          if (statusMsg) {
            toast({ description: `圖片上傳失敗： ${statusMsg.message}` });
          } else {
            toast({ description: '圖片上傳成功！' });
          }
        });
      }
    },

    [files, maxFiles, maxSize, multiple, setFiles, toast]
  );

  const onRemove = (index: number) => {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    const newImageURLs = imageURLs?.filter((_, i) => i !== index);
    setImageURLs(newImageURLs);
    onValueChange?.(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize,
      maxFiles,
      multiple,
      onDrop,
    });

  // Revoke preview url when component unmounts
  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        {...getRootProps({})}
        className={cn(
          'group relative grid h-52 w-full cursor-pointer place-items-center rounded-[0.375rem] border-2 border-dashed border-primary/25 px-5 py-2.5 text-center ring-offset-background transition hover:bg-primary-super-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <P>請將圖片放下...</P>
        ) : (
          <P>將圖片拖放到此處，或點選區域以選擇圖片</P>
        )}
      </div>
      {files?.length ? (
        <div className="h-fit w-full py-4">
          <div className="flex flex-wrap gap-4">
            {files?.map((file, index) => (
              <FileCard
                key={file.name + Math.floor(Math.random() * 100 + index)}
                file={file}
                onRemove={() => onRemove(index)}
                isUploading={isUploading}
              />
            ))}
          </div>
        </div>
      ) : null}
      <input type="hidden" value={imageURLs.toString()} />
    </div>
  );
};

export default ImageDropzone;
