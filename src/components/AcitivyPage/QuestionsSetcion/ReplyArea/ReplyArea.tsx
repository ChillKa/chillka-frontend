import Comment from '@components/AcitivyPage/QuestionsSetcion/Comment';
import ReplyCard from '@components/AcitivyPage/QuestionsSetcion/ReplyArea/ReplyCard';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { IReply } from 'src/types/activity';

type ReplyAreaProps = {
  className: string;
  questionId: string;
  questionUserId: string;
  replies: IReply[];
};

const ReplyArea = ({
  className,
  questionUserId,
  questionId,
  replies,
}: ReplyAreaProps) => {
  const { userId, data } = useActivityContext();

  if (!data) {
    return null;
  }

  const showComment =
    questionUserId === userId || data.activity.creatorId === userId;

  return (
    <div
      className={cn(
        'border-l-2 border-primary text-primary',
        'mt-4 px-6 xl:mt-6',
        className
      )}
    >
      {replies.map((reply, index) => {
        const isOrganizer = data.activity.creatorId === reply.userId;
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
      {showComment && (
        <Comment className="mt-4" action="reply" questionId={questionId} />
      )}
    </div>
  );
};

export default ReplyArea;
