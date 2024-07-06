import DeleteQuestionButton from '@components/ActivityPage/QuestionsSetcion/DeleteQuestionButton';
import ReplyArea from '@components/ActivityPage/QuestionsSetcion/ReplyArea';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Large, Lead, Small } from '@components/ui/typography';
import formatDateTime from '@lib/dateUtils';
import cn from '@lib/utils';
import { IAcitivityResponse, IQuestion } from 'src/types/activity';

type QuestionProps = {
  className: string;
  question: IQuestion;
  data: IAcitivityResponse;
  userId: string;
  getActivity: (id: string) => Promise<void>;
};

const Question = ({
  className,
  question,
  data,
  userId,
  getActivity,
}: QuestionProps) => {
  const createdAt = formatDateTime(question.createdAt);
  const showDeleteButton =
    userId === question.userId || userId === data.activity.creatorId;
  const firstLetter = question.displayName.charAt(0);

  return (
    <div className={cn('py-6', className)}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage
              className="object-cover"
              src={question.profilePicture}
              alt={question.displayName}
            />
            <AvatarFallback className="rounded-2xl bg-primary-light text-white">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-2">
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
          <DeleteQuestionButton
            activityId={data.activity._id}
            questionId={question._id}
            getActivity={getActivity}
          />
        )}
      </div>
      <Large className="mt-4 xl:mt-6">{question.content}</Large>
      <ReplyArea
        className=""
        activityId={data.activity._id}
        questionId={question._id}
        questionUserId={question.userId}
        replies={question.replies}
        data={data}
        userId={userId}
        getActivity={getActivity}
      />
    </div>
  );
};

export default Question;
