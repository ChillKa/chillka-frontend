import Question from '@components/AcitivyPage/QuestionsSetcion/Question';
import UserComment from '@components/AcitivyPage/QuestionsSetcion/UserComment';
import cn from '@lib/utils';
import { QuestionType } from 'src/types/activity';

type QuestionsSetcionProps = {
  className: string;
  questions: QuestionType[];
  creatorId: string;
};

const QuestionsSetcion = ({
  className,
  questions,
  creatorId,
}: QuestionsSetcionProps) => {
  return (
    <section className={cn('border-b py-6 text-primary xl:py-12', className)}>
      <div className="mb-4 text-2xl font-bold -tracking-[0.006em] xl:mb-6 xl:text-3xl xl:-tracking-[0.0075em]">
        Q&A
      </div>
      {questions.map((question, index) => {
        const isLast = index === questions.length - 1;
        return (
          <Question
            className={isLast ? '' : 'border-b'}
            question={question}
            creatorId={creatorId}
            key={question._id}
          />
        );
      })}
      <UserComment />
    </section>
  );
};

export default QuestionsSetcion;
