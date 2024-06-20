import Comment from '@components/AcitivyPage/QuestionsSetcion/Comment';
import ReplyCard from '@components/AcitivyPage/QuestionsSetcion/ReplyArea/ReplyCard';
import cn from '@lib/utils';
import { ReplyType } from 'src/types/activity';

type ReplyAreaProps = {
  className: string;
  creatorId: string;
  replies: ReplyType[];
};

const ReplyArea = ({ className, creatorId, replies }: ReplyAreaProps) => {
  return (
    <div
      className={cn(
        'border-l-2 border-primary text-primary',
        'mt-4 px-6 xl:mt-6',
        className
      )}
    >
      {replies.map((reply, index) => {
        const isOrganizer = creatorId === reply.userId;
        const isLast = index === replies.length - 1;

        return (
          <ReplyCard
            key={reply._id}
            className={isLast ? 'pb-2' : 'border-b pb-4'}
            isOrganizer={isOrganizer}
            reply={reply}
          />
        );
      })}
      <Comment className="mt-4" action="reply" />
    </div>
  );
};

export default ReplyArea;
