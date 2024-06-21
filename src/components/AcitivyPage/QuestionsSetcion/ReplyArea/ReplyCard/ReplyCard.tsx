'use client';

import { deleteQuestion } from '@action/activity';
import { Button } from '@components/ui/button';
import { Large, Lead, Small } from '@components/ui/typography';
import { toast } from '@components/ui/use-toast';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { ReplyType } from 'src/types/activity';

type ReplyCardProps = {
  className: string;
  reply: ReplyType;
  isOrganizer: boolean;
};

const ReplyCard = ({ className, reply, isOrganizer }: ReplyCardProps) => {
  const createdAt = formatDateTime(reply.createdAt);
  const { loadActivity, data, userId } = useActivityContext();
  const [isPending, startTransition] = useTransition();

  if (!data) {
    return null;
  }

  const handleDeleteQuestion = () => {
    startTransition(async () => {
      const result = await deleteQuestion(data.activity._id, reply._id);
      if (result?.message !== '') {
        toast({
          title: result?.message ?? 'Unknown error',
          variant: result?.status === 'success' ? 'default' : 'destructive',
        });
      }
      if (result?.status === 'success') loadActivity(data.activity._id);
    });
  };

  const showDeleteButton =
    userId === reply.userId || userId === data.activity.creatorId;

  return (
    <div className={cn('pt-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lead>{isOrganizer ? '主辦方回覆' : reply.displayName}</Lead>
          <Small className="ml-2">{createdAt}</Small>
        </div>
        {showDeleteButton && (
          <Button
            className="p-2 text-primary transition-colors hover:bg-transparent hover:text-primary/70"
            variant="ghost"
            onClick={handleDeleteQuestion}
            disabled={isPending}
          >
            <Trash2 size={24} />
          </Button>
        )}
      </div>
      <Large className="mt-4" />
      <Large className="mt-4">{reply.content}</Large>
    </div>
  );
};

export default ReplyCard;
