import { fetchComments } from '@action/comment';
import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import CommentCarousel from './CommentSection/CommentCarousel';

type CommentSectionProps = {
  className: string;
};

const CommentSection = async ({ className = '' }: CommentSectionProps) => {
  const { data } = await fetchComments();
  const comments = data?.comments!;

  return (
    <section
      className={cn(
        'space-y-12 px-3 text-primary xl:max-w-[81rem] xl:px-0',
        className
      )}
    >
      <h1 className="text-5xl font-bold tracking-[0.036rem]">
        探索他人的精彩經歷，找到你的下段冒險
      </h1>
      <Separator className="h-0.5 w-12" />
      <CommentCarousel comments={comments} />
    </section>
  );
};

export default CommentSection;
