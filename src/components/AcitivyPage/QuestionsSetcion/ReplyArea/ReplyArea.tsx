import Comment from '@components/AcitivyPage/QuestionsSetcion/Comment';
import ReplyCard from '@components/AcitivyPage/QuestionsSetcion/ReplyArea/ReplyCard';
import cn from '@lib/utils';
import { IAcitivityResponse, IReply } from 'src/types/activity';

type ReplyAreaProps = {
  className: string;
  activityId: string;
  questionId: string;
  questionUserId: string;
  replies: IReply[];
  data: IAcitivityResponse;
  userId: string;
  getActivity: (id: string) => Promise<void>;
};

const ReplyArea = async ({
  className,
  activityId,
  questionUserId,
  questionId,
  replies,
  data,
  userId,
  getActivity,
}: ReplyAreaProps) => {
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
            activityId={activityId}
            reply={reply}
            data={data}
            userId={userId}
            getActivity={getActivity}
          />
        );
      })}
      {showComment && (
        <Comment
          className="mt-4"
          action="reply"
          questionId={questionId}
          activityId={activityId}
          getActivity={getActivity}
        />
      )}
    </div>
  );
};

export default ReplyArea;
