import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import cn from '@lib/utils';
import { IAcitivityResponse } from 'src/types/activity';

type OrganizerNameProps = {
  className: string;
  data: IAcitivityResponse;
};

const OrganizerName = ({ className, data }: OrganizerNameProps) => {
  const firstLetter = data.activity.organizer.name.charAt(0);

  return (
    <div className={cn('flex h-full items-center', className)}>
      <div className="h-12 w-12 xl:h-20 xl:w-20">
        <Avatar className="h-full w-full rounded-2xl">
          <AvatarImage
            src={data.activity.organizer.profilePicture}
            alt="Organizer"
          />
          <AvatarFallback className="rounded-2xl">{firstLetter}</AvatarFallback>
        </Avatar>
      </div>
      <div className="ml-4 text-xl font-bold -tracking-[0.005em] xl:ml-6 xl:text-2xl xl:-tracking-[0.006em]">
        {data.activity.organizer.name}
      </div>
    </div>
  );
};

export default OrganizerName;
