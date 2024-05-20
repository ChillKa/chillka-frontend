import cn from '@lib/utils';

type CommentCardProps = {
  className: string;
};

const CommentCard = ({ className = '' }: CommentCardProps) => {
  return (
    <div className={cn('text-primary', className)}>
      <h1>transparent</h1>
    </div>
  );
};

export default CommentCard;
