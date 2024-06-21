'use client';

import DeleteQuestionButton from '@components/AcitivyPage/QuestionsSetcion/DeleteQuestionButton';
import ReplyArea from '@components/AcitivyPage/QuestionsSetcion/ReplyArea';
import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import Image from 'next/image';
import { QuestionType } from 'src/types/activity';

type QuestionProps = {
  className: string;
  question: QuestionType;
};

const Question = ({ className, question }: QuestionProps) => {
  const createdAt = formatDateTime(question.createdAt);
  const { data, userId } = useActivityContext();

  if (!data) {
    return null;
  }

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
        {showDeleteButton && <DeleteQuestionButton questionId={question._id} />}
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
