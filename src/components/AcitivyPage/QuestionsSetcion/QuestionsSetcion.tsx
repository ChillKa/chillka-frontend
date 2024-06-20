import UserComment from '@components/AcitivyPage/QuestionsSetcion/UserComment';
import cn from '@lib/utils';

type QuestionsSetcionProps = {
  className: string;
};

const QuestionsSetcion = ({ className }: QuestionsSetcionProps) => {
  return (
    <section className={cn('border-b py-6 text-primary xl:py-12', className)}>
      <div className="mb-4 text-2xl font-bold -tracking-[0.006em] xl:mb-6 xl:text-3xl xl:-tracking-[0.0075em]">
        Q&A
      </div>
      <UserComment />
    </section>
  );
};

export default QuestionsSetcion;
