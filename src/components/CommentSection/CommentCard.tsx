import cn from '@lib/utils';
import { parseISO } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import { zhTW } from 'date-fns/locale';
import Image from 'next/image';

type CommentCardProps = {
  className: string;
  participant: string;
  profilePicture: string;
  activityName: string;
  date: string;
  content: string;
};

const CommentCard = ({
  className = '',
  participant,
  profilePicture,
  activityName,
  date,
  content,
}: CommentCardProps) => {
  const formattedDate = format(
    toZonedTime(parseISO(date), 'Asia/Taipei'),
    'yyyy.MM.dd',
    {
      locale: zhTW,
      timeZone: 'Asia/Taipei',
    }
  );

  return (
    <div className={cn('space-y-6 text-primary', className)}>
      <div className="flex items-center gap-4">
        <div className="relative size-12">
          <Image
            src={profilePicture}
            fill
            className="inline-block rounded-[0.5rem] object-cover"
            alt="User's avatar."
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div>
          <p className="text-xl font-bold">{participant}</p>
          <span className="text-xs/5 font-medium">{formattedDate}</span>
        </div>
      </div>
      <p className="line-clamp-4 min-h-24 text-sm/6">{content}</p>
      <span className="block text-sm/6 font-medium">#{activityName}</span>
    </div>
  );
};

export default CommentCard;
