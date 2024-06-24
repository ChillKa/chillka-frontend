import Question from '@components/AcitivyPage/QuestionsSetcion/Question';
import SkeletonQuestionsSetcion from '@components/AcitivyPage/QuestionsSetcion/SkeletonQuestionsSetcion';
import UserComment from '@components/AcitivyPage/QuestionsSetcion/UserComment';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';

type QuestionsSetcionProps = {
  className: string;
};

const QuestionsSetcion = ({ className }: QuestionsSetcionProps) => {
  const { data } = useActivityContext();

  if (!data) return <SkeletonQuestionsSetcion />;

  return (
    <section className={cn('border-b py-6 text-primary xl:py-12', className)}>
      <div className="mb-4 text-2xl font-bold -tracking-[0.006em] xl:mb-6 xl:text-3xl xl:-tracking-[0.0075em]">
        Q&A
      </div>
      {data.questions.map((question, index) => {
        const isLast = index === data.questions.length - 1;
        return (
          <Question
            className={isLast ? '' : 'border-b'}
            question={question}
            key={question._id}
          />
        );
      })}
      <UserComment />
    </section>
  );
};

export default QuestionsSetcion;
