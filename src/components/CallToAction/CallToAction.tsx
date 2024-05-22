import cn from '@lib/utils';
import Video from './Video';

type CalltoActionProps = {
  className: string;
};

const CallToAction = ({ className }: CalltoActionProps) => {
  return (
    <section className={cn('relative xl:max-w-[81rem]', className)}>
      123
      <Video className="absolute" />
      232323
    </section>
  );
};

export default CallToAction;
