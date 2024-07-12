import { Skeleton } from '@components/ui/skeleton';
import { Small } from '@components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const SkeletonActivityResultThumbnail = () => {
  return (
    <div className="min-w-fit space-y-2">
      <Skeleton className="h-[100px] w-[200px]" />

      <Skeleton />
    </div>
  );
};

type ActivityResultThumbnailProps = {
  id?: string;
  thumbnail?: string;
  description: string;
};
const ActivityResultThumbnail = ({
  id,
  thumbnail,
  description,
}: ActivityResultThumbnailProps) => {
  const [imageSrc, setImageSrc] = useState(thumbnail ?? '/default.webp');

  return (
    <Link href={`/activity/${id}` ?? '/search'}>
      <div className="min-w-fit space-y-2">
        <Image
          src={imageSrc}
          alt={description ?? 'Thumbnail default description'}
          placeholder="blur"
          blurDataURL="/loading.webp"
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) setImageSrc('/default.webp');
          }}
          onError={() => setImageSrc('/default.webp')}
          width={200}
          height={100}
          className="h-[6.25rem] w-[12.5rem] object-cover"
        />
        {description && <Small>{description}</Small>}
      </div>
    </Link>
  );
};

export default ActivityResultThumbnail;
