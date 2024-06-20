import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { ReplyType } from 'src/types/activity';

type ReplyCardProps = {
  className: string;
  reply: ReplyType;
  isOrganizer: boolean;
};

const ReplyCard = ({ className, reply, isOrganizer }: ReplyCardProps) => {
  const createdAt = formatDateTime(reply.createdAt);

  return (
    <div className={cn('pt-2', className)}>
      <div className="flex items-center">
        <Lead>{isOrganizer ? '主辦方回覆' : reply.displayName}</Lead>
        <Small className="ml-2">{createdAt}</Small>
      </div>
      <Large className="mt-4" />
      <Large className="mt-4">{reply.content}</Large>
    </div>
  );
};

export default ReplyCard;
