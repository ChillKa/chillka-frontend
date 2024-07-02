import { Small } from '@components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ActivityResultThumbnailProps = {
  link?: string;
  thumbnail?: string;
  description: string;
};
const ActivityResultThumbnail = ({
  link,
  thumbnail,
  description,
}: ActivityResultThumbnailProps) => {
  const [imageSrc, setImageSrc] = useState(thumbnail ?? '/default.webp');

  return (
    <Link href={link ?? '/search'}>
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
