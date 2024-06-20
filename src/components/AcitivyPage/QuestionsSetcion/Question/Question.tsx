import ReplyArea from '@components/AcitivyPage/QuestionsSetcion/ReplyArea';
import { Button } from '@components/ui/button';
import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { QuestionType } from 'src/types/activity';

type QuestionProps = {
  className: string;
  question: QuestionType;
  creatorId: string;
};

const Question = ({ className, question, creatorId }: QuestionProps) => {
  const createdAt = formatDateTime(question.createdAt);

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
            <Lead>{question.displayName}</Lead>
            <Small>{createdAt}</Small>
          </div>
        </div>
        <Button
          className="p-2 text-primary transition-colors hover:bg-transparent hover:text-primary/70"
          variant="ghost"
        >
          <Trash2 size={24} />
        </Button>
      </div>
      <Large className="mt-4 xl:mt-6">{question.content}</Large>
      {question.replies.length !== 0 && (
        <ReplyArea
          className=""
          creatorId={creatorId}
          replies={question.replies}
        />
      )}
    </div>
  );
};

export default Question;
