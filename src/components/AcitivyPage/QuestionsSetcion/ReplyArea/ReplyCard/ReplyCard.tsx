'use client';

import DeleteQuestionButton from '@components/AcitivyPage/QuestionsSetcion/DeleteQuestionButton';
import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { IReply } from 'src/types/activity';

type ReplyCardProps = {
  className: string;
  reply: IReply;
  isOrganizer: boolean;
};

const ReplyCard = ({ className, reply, isOrganizer }: ReplyCardProps) => {
  const createdAt = formatDateTime(reply.createdAt);
  const { data, userId } = useActivityContext();

  if (!data) {
    return null;
  }

  const showDeleteButton =
    userId === reply.userId || userId === data.activity.creatorId;

  return (
    <div className={cn('pt-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lead>{isOrganizer ? '主辦方回覆' : reply.displayName}</Lead>
          <Small className="ml-2">{createdAt}</Small>
        </div>
        {showDeleteButton && <DeleteQuestionButton questionId={reply._id} />}
      </div>
      <Large className="mt-4" />
      <Large className="mt-4">{reply.content}</Large>
    </div>
  );
};

export default ReplyCard;
