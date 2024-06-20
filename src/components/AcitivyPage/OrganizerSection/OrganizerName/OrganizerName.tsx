import cn from '@lib/utils';
import Image from 'next/image';

type OrganizerNameProps = {
  className: string;
  profilePicture: string;
  organizer: string;
};

const OrganizerName = ({
  className,
  profilePicture,
  organizer,
}: OrganizerNameProps) => {
  return (
    <div className={cn('flex h-full items-center', className)}>
      {' '}
      <div className="h-12 w-12 xl:h-20 xl:min-w-20">
        <Image
          src={profilePicture}
          width={80}
          height={80}
          loading="eager"
          className="h-full w-full rounded-2xl"
          alt="Organizer"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="ml-4 w-full text-xl font-bold -tracking-[0.005em] xl:text-2xl xl:-tracking-[0.006em]">
        {organizer}
      </div>
    </div>
  );
};

export default OrganizerName;
