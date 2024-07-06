import DeleteQuestionButton from '@components/ActivityPage/QuestionsSetcion/DeleteQuestionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { IAcitivityResponse, IReply } from 'src/types/activity';

type ReplyCardProps = {
  className: string;
  reply: IReply;
  isOrganizer: boolean;
  activityId: string;
  data: IAcitivityResponse;
  userId: string;
  getActivity: (id: string) => Promise<void>;
};

const ReplyCard = ({
  className,
  reply,
  isOrganizer,
  activityId,
  data,
  userId,
  getActivity,
}: ReplyCardProps) => {
  const createdAt = formatDateTime(reply.createdAt);
  const showDeleteButton =
    userId === reply.userId || userId === data.activity.creatorId;
  const firstLetter = reply.displayName.charAt(0);

  return (
    <div className={cn('pt-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="mr-4 h-12 w-12 rounded-full">
            <AvatarImage src={reply.profilePicture} alt={reply.displayName} />
            <AvatarFallback className="rounded-2xl bg-primary text-white">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <Lead>{isOrganizer ? '主辦方回覆' : reply.displayName}</Lead>
          <Small className="ml-2">{createdAt}</Small>
        </div>
        {showDeleteButton && (
          <DeleteQuestionButton
            questionId={reply._id}
            activityId={activityId}
            getActivity={getActivity}
          />
        )}
      </div>
      <Large className="mt-4" />
      <Large className="mt-4">{reply.content}</Large>
    </div>
  );
};

export default ReplyCard;
