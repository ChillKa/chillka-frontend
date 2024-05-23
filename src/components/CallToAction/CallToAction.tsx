import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import cn from '@lib/utils';
import Video from './Video';

type CalltoActionProps = {
  className: string;
};

const CallToAction = ({ className }: CalltoActionProps) => {
  return (
    <section
      className={cn(
        'relative pb-[100px] pt-[72px] xl:max-w-[81rem] xl:pb-0 xl:pt-20',
        className
      )}
    >
      <div className="absolute left-0 top-0">
        <h1 className="w-fit bg-surface pl-[13px] pr-4 text-5xl font-bold -tracking-[0.012em] xl:pb-4">
          找不到
          <br className="hidden xl:block" />
          心目中的
          <br className="xl:hidden" />
          活動嗎？
        </h1>
        <h1 className="w-[360.98px] bg-surface  pb-4 pl-[13px] pr-4 text-5xl font-bold -tracking-[0.012em] xl:-mt-3 xl:w-fit">
          讓你來揪咖！
        </h1>
        <div className="w-fit bg-surface px-4 py-[30px]">
          <Separator className="h-[2px] w-12 bg-primary" />
        </div>
        <p className="w-fit bg-surface p-4 pb-0 text-sm font-medium leading-6">
          Your Crew, Your Call
        </p>
        <p className="-mt-2 w-fit bg-surface p-4 pt-2 text-sm font-medium leading-6">
          Bring Your Own Adventure!
        </p>
      </div>
      <Video className="h-[750px] w-full xl:h-[420px] xl:px-[110px]" />
      <div className="absolute bottom-0 right-0 pb-[33px] pl-[31px] pr-[30px] pt-[34px]">
        <Button className="h-[134px] w-[140px] bg-transparent bg-[url('/callToActionButton-surface.svg')] text-base font-medium text-primary transition duration-300 ease-out hover:bg-transparent hover:bg-[url('/callToActionButton-primary.svg')] hover:text-surface">
          開始揪咖
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
