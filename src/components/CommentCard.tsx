import cn from '@lib/utils';

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
  const currentDate = new Date(date);
  return (
    <div className={cn('space-y-6 text-primary', className)}>
      <div className="flex items-center gap-4">
        <img
          src={profilePicture}
          width={48}
          height={48}
          className="inline-block rounded-[0.5rem]"
          alt="User's avatar."
        />
        <div>
          <p className="text-xl font-bold">{participant}</p>
          <span className="text-xs/5 font-medium">
            {currentDate.toLocaleDateString('zh-tw').replaceAll('/', '.')}
          </span>
        </div>
      </div>
      <p className="text-sm/6">{content}</p>
      <span className="block text-sm/6 font-medium">#{activityName}</span>
    </div>
  );
};

export default CommentCard;
