'use client';

import { deleteQuestion } from '@action/activity';
import ReplyArea from '@components/AcitivyPage/QuestionsSetcion/ReplyArea';
import { Button } from '@components/ui/button';
import { Large, Lead, Small } from '@components/ui/typography';
import { toast } from '@components/ui/use-toast';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTransition } from 'react';
import { QuestionType } from 'src/types/activity';

type QuestionProps = {
  className: string;
  question: QuestionType;
};

const Question = ({ className, question }: QuestionProps) => {
  const createdAt = formatDateTime(question.createdAt);
  const { loadActivity, data, userId } = useActivityContext();
  const [isPending, startTransition] = useTransition();

  if (!data) {
    return null;
  }

  const handleDeleteQuestion = () => {
    startTransition(async () => {
      const result = await deleteQuestion(data.activity._id, question._id);
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
    userId === question.userId || userId === data.activity.creatorId;

  return (
    <div className={cn('py-6', className)}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex">
          <Image
            src="https://picsum.photos/id/65/1200/1200"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
            loading="eager"
            alt="user"
            style={{
              objectFit: 'cover',
            }}
          />
          <div className="ml-6 space-y-2">
            <div className="flex">
              <Lead>{question.displayName}</Lead>
              {userId === question.userId && (
                <div className="ml-2 w-fit bg-primary px-2 py-1 text-xs/5 font-medium text-white">
                  來自你的提問
                </div>
              )}
            </div>
            <Small>{createdAt}</Small>
          </div>
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
      <Large className="mt-4 xl:mt-6">{question.content}</Large>
      <ReplyArea
        className=""
        questionId={question._id}
        questionUserId={question.userId}
        replies={question.replies}
      />
    </div>
  );
};

export default Question;
